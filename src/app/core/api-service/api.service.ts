import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concat, Observable, of, throwError } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { catchError, delay, finalize, retryWhen, switchMap, take } from 'rxjs/operators';
import { ActionsApiProvider } from './actions-api.service';
import { LoaderOptions } from './api.interface';

interface ErrorObj {
    readonly error?: string;
    readonly status?: number;
    readonly statusText?: string;
}

@Injectable()
export class ApiService {
    public _attempts: number = 3;
    public _delayTime: number = 1200;
    public _errorObj: ErrorObj = {};

    constructor(
        private readonly _http: HttpClient,
        private readonly _ActionsApiProvider: ActionsApiProvider
    ) { }

    public delete(apiUrl: string, query: object = {}, reqOptions: any = {}, httpOptions: any = {}): Observable<any> {
        this._beforeRequest(reqOptions);
        const parsedHttpOptions = this._addHttpParams(httpOptions, query);

        return (this._http.delete(`${apiUrl}`, parsedHttpOptions)as any).pipe(...this._getDefaultOperators(reqOptions));
    }

    public get(apiUrl: string, query: object = {}, reqOptions: any = {}, httpOptions: any = {}): Observable<any> {
        this._beforeRequest(reqOptions);
        const parsedHttpOptions = this._addHttpParams(httpOptions, query);

        return (this._http.get(`${apiUrl}`, parsedHttpOptions)as any).pipe(...this._getDefaultOperators(reqOptions));
    }

    public post(
        apiUrl: string,
        body?: object | string,
        query: any = {},
        reqOptions: any = {},
        httpOptions: any = {}
    ): Observable<any> {
        this._beforeRequest(reqOptions);
        const parsedHttpOptions = this._addHttpParams(httpOptions, query);

        return (this._http.post(`${apiUrl}`, body, parsedHttpOptions)as any).pipe(...this._getDefaultOperators(reqOptions));
    }

    public put(
        apiUrl: string,
        body?: object | string,
        query: any = {},
        reqOptions: any = {},
        httpOptions: any = {}
    ): Observable<any> {
        this._beforeRequest(reqOptions);
        const parsedHttpOptions = this._addHttpParams(httpOptions, query);

        return (this._http.put(`${apiUrl}`, body, parsedHttpOptions)as any).pipe(...this._getDefaultOperators(reqOptions));
    }

    // @httpOptions => httpOptions.observe = 'response';
    public _addHttpParams(httpOptions: any = {}, objQuery: any): any {
        if (objQuery) {
            httpOptions.params = new HttpParams();
            // tslint:disable-next-line: no-loop-statement
            for (const key in objQuery) {
                if (objQuery.hasOwnProperty(key)) {
                    objQuery[key] !== undefined && (httpOptions.params = httpOptions.params.set(key, objQuery[key]));
                }
            }
        }

        return httpOptions;
    }

    public _onCatchErrors(reqOptions, err: HttpErrorResponse): Observable<any> {
        if (err.error instanceof Error) {
            console.warn('Client-Side error occured -> FRONTEND');
        } else {
            console.warn('Server-Side error occured -> BACKEND');
        }
        console.error(err, this._errorObj);
        // this._handleErrors(this._errorObj, reqOptions);

        return throwError({ ...err, ...this._errorObj });
    }

    public _retryWhen(err: Observable<any>): Observable<any> {
        return err.pipe(
            switchMap((errorHttp: any) => {
                const { error, status, statusText } = errorHttp;
                this._errorObj = { error, status, statusText };
                if (!status || (+status >= 500 && +status < 600 && +status === 404)) {
                    return of(status).pipe(delay(this._delayTime));
                }

                return Observable.throw({ errorRetry: 'No retry', ...this._errorObj });
            }),
            take(this._attempts)
        );
    }

    public _getDefaultOperators(reqOptions): any[] {
        return [
            retryWhen(this._retryWhen.bind(this)),
            catchError(this._onCatchErrors.bind(this, reqOptions)),
            finalize(this._afterRequest.bind(this, reqOptions.showLoader))
        ];
    }

    public _beforeRequest(options: LoaderOptions): void {
        if (options.showLoader) {
            this._ActionsApiProvider.beforeRequest(options);
        }
    }

    public _afterRequest(isLoaderVisible: boolean): void {
        if (isLoaderVisible) {
            this._ActionsApiProvider.afterRequest();
        }
    }

    // public _handleErrors(httpError: ErrorObj, reqOptions: any = {}): void {
    //     // TODO: remove after ios
    //     console.info(httpError);
    //     const httpStatusCodeAction = {
    //         0: this._ActionsApiProvider.actionForError.bind(this._ActionsApiProvider, httpError),
    //         500: this._ActionsApiProvider.actionForError.bind(this._ActionsApiProvider, httpError),
    //         404: this._ActionsApiProvider.actionForError.bind(this._ActionsApiProvider, httpError),
    //         900: this._ActionsApiProvider.actionForError.bind(this._ActionsApiProvider, httpError)
    //     };
    //     if (reqOptions.dontShowModalsError) {
    //         return void 0;
    //     }

    //     if (httpError.status >= 500 && httpError.status < 600) {
    //         httpStatusCodeAction['500']();
    //     } else {
    //         httpStatusCodeAction[httpError.status] && httpStatusCodeAction[httpError.status]();
    //     }
    // }
}
