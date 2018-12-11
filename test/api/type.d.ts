/**
 * @file /test/url
 */


 interface ApiBaseResp {
    error: 0 | 1;
    data: any
}

interface ApiErrorBaseResp<T> extends ApiBaseResp {
    error: 1;
    data: T
}

interface ApiSuccessBaseResp<T> extends ApiBaseResp {
    error: 0;
    data: T;
}

interface ExpiredData {
    isExpired: 1;
}

interface notQualifiedData {
    notQualified: 1;
}

/**
 * some strange things
 */
type ApiSuccessResp = ApiSuccessBaseResp<{}>;

type ApiExpireResp = ApiErrorBaseResp<ExpiredData>;
type ApiNotQualifiedResp = ApiErrorBaseResp<notQualifiedData>;

type ApiErrorResp = ApiExpireResp | ApiNotQualifiedResp;

type ApiResp = ApiErrorResp | ApiSuccessResp;
