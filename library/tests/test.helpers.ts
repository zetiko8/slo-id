import { TestScheduler } from 'rxjs/testing';
import {
  EMPTY,
  merge,
  Observable,
  OperatorFunction,
} from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import * as chai from 'chai';
import { SinonSandbox, SinonSpy } from 'sinon';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import {
  CreateProcessFunction,
  Process,
  WrapProcessOptions,
} from '../src/index';
import { assertDeepEqual } from '@zetiko8/rxjs-testing-helpers';

const expect = chai.expect;

export interface NormalTestReturns {
  processFn: SinonSpy<[value: string], Observable<string>>,
  success$: Observable<string>,
}

export const getNormalTestReturns = (
  sbx: SinonSandbox,
  operator: MultipleExecutionsStrategyOperator<string, string>,
  getProccesFn: () => (value: string) => Observable<string>,
  triggers: Observable<string>[],
): NormalTestReturns => {

  const spyWrapper
  = spy(sbx, getProccesFn());

  const normalData$ = merge(...triggers)
    .pipe(
      operator(
        (arg) => spyWrapper
          .fn(arg)
          .pipe(
            catchError(() => EMPTY),
          ),
      ),
    );

  return {
    processFn: spyWrapper.spy,
    success$: normalData$,
  };
};

export interface ProcessorTestReturns {
  processFn: SinonSpy<[value: string], Observable<string>>,
  success$: Observable<string>,
  inProgress$: Observable<boolean>,
  error$: Observable<Error | null>,
}

export const getProcessorTestReturns = (
  sbx: SinonSandbox,
  createProcessFunction: CreateProcessFunction,
  getProccesFn: () => (value: string) => Observable<string>,
  triggers: Observable<string>[],
  options: WrapProcessOptions,
): ProcessorTestReturns => {
  const spyWrapper
    = spy(sbx, getProccesFn());

  const proccesor = createProcessFunction<string, string>(
    wrap => merge(...triggers)
      .pipe(
        wrap(
          (arg) => spyWrapper.fn(arg),
          options,
        ),
      ),
  );

  return {
    success$: proccesor.data$,
    inProgress$: proccesor.inProgress$,
    error$: proccesor.error$,
    processFn: spyWrapper.spy,
  };
};

export const getProcessTestReturns = (
  sbx: SinonSandbox,
  process: Process<string>,
  getProcessFn: () => (value: string) => Observable<string>,
  triggers: Observable<string>[],
): {
  processFn: SinonSpy<[value: string], Observable<string>>
} => {
  const spyWrapper = spy(sbx, getProcessFn());
  function onWrite (value: string) {
    process.execute(
      () => spyWrapper.fn(value))
      .subscribe(ignoreErrorSub);
  }

  // user writes
  triggers.forEach(t => t.subscribe(onWrite));

  return {
    processFn: spyWrapper.spy,
  };
};

export interface MultipleExecutionsStrategyOperator<T, R> {
  (
    project: (
      value: T, index: number
    ) => Observable<R>): OperatorFunction<T, R>
}

export type TestScenarioReturn = {
  processLegacy: {
    processFn: SinonSpy<[value: string], Observable<string>>,
  },
  wrapProcess: ProcessorTestReturns,
  normalOperator: NormalTestReturns,
  error: TestError,
  after: Observable<void>
}

export const logger = {
  logLevel: 0,
  debug (...args: unknown[]): void {
    // eslint-disable-next-line no-console
    if (this.logLevel > 3) console.log(...args);
  },
  log (...args: unknown[]): void {
    // eslint-disable-next-line no-console
    if (this.logLevel > 2) console.log(...args);
  },
  warn (...args: unknown[]): void {
    // eslint-disable-next-line no-console
    if (this.logLevel > 1) console.log(...args);
  },
  error (...args: unknown[]): void {
    // eslint-disable-next-line no-console
    if (this.logLevel > 0) console.log(...args);
  },
};

export const values = {
  t: true, f: false, a: 'a', b: 'b', c: 'c', n: null, v: 'v',
  w: 'w',
  o: 'o', p: 'p', r: 'r', s: 's', u: 'u',
};

export type ColdCreator = <T = string>(marbles: string, values?: {
  [marble: string]: T;
} | undefined, error?: unknown) => ColdObservable<T>;

export function fakeApiCall<T> (
  source$: Observable<T>,
): Observable<T> {
  return source$.pipe(take(1));
}

export function spy<T>(
  sinon: SinonSandbox,
  fn: T,
): {
  spy: T extends (...args: infer TArgs)
    => infer TReturnValue ? SinonSpy<TArgs, TReturnValue>
    : SinonSpy<unknown[], unknown>;
  fn: T;
} {
  const wrapper = {
    fn,
  };
  return {
    spy: sinon.spy(wrapper, 'fn'),
    fn: wrapper.fn,
  };
}

export function assertCallCount (
  spy: SinonSpy,
  callCount: number,
): void {
  try {
    expect(spy.callCount)
      .to.equal(callCount, 'Expected call count');
  } catch (error) {
    (error as Error).stack = '';
    throw error;
  }
}

export function prepareTestScheduler (): TestScheduler {
  return new TestScheduler(
    (actual, expected) => {
      try {
        return assertDeepEqual(actual, expected);
      } catch (error) {
        (error as Error).stack = '';
        throw error;
      }
    });
}

export const ignoreErrorSub = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/explicit-module-boundary-types
  error() {},
};

export class TestError extends Error {
  id = Math.random();
  constructor (message: string) {
    super(message);
  }
}

/**
 * Creates an observable that will fire
 * after all the other observables are finished
 */
export function createAfter$ (
  cold: ColdCreator,
): Observable<undefined> {
  /**
   * The implementation is dumb
   *  - just make an observable that fires really late
   */
  return cold('----------------------------------------------------1')
    .pipe(map(() => undefined));
}

export function executeAfter (
  cold: ColdCreator,
  pattern: string,
  fn: () => unknown,
): void {
  cold(pattern)
    .subscribe(fn);
}

export const expectToThrow = (
  fn: () => unknown,
): {
  with: (errorMessage: string) => {
      and: (assertOnErrorFunction: (error: Error) => void) => void;
  };
} => {
  return {
    with: (errorMessage: string) => {
      try {
        fn();
      } catch (error) {
        expect((error as Error).message)
          .to.equal(errorMessage);

        return {
          and: (
            assertOnErrorFunction: (error: Error) => void,
          ) => {
            assertOnErrorFunction(error as Error);
          },
        };
      }

      expect('{no error thrown}')
        .to.equal(errorMessage);

      return {
        and: (
          assertOnErrorFunction: (error: Error) => void,
        ) => {
          assertOnErrorFunction(null as unknown as Error);
        },
      };
    },
  };
};

export const expectToNotThrow = (
  fn: () => unknown,
): void => {
  try {
    fn();
  } catch (error) {
    expect('{no error thrown}')
      .to.equal((error as Error).message);
  }
};

export function fakeInterval (
  cold: ColdCreator,
  intervalTime: number,
  duration: number,
): Observable<string> {
  let pattern = '';
  nTimes(duration, () => {
    nTimes(intervalTime, () => pattern += '-');
    pattern += 't';
  });

  return cold(pattern);
}

export const nTimes = (
  n: number,
  callback: (n: number) => void,
): void => {
  for (let i = 0; i < n; ++i) {
    callback(i);
  }
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = (): void => {};