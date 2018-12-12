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

interface UserStatus {
    /**
     * @pattern \*{4} [0-9]{4}
     */
    name: string;
    /**
     * @type integer
     * @minimum 0
     * @maximum 100
     * @autoIncrement true
     */
    score: number;
}

interface GameStatus {
    userScore: UserStatus;
    /**
     * @minItems 10
     * @maxItems 10
     */
    topUsers: UserStatus[];
}
/**
 * some strange things
 */
type ApiSuccessResp = ApiSuccessBaseResp<GameStatus>;

type ApiExpireResp = ApiErrorBaseResp<ExpiredData>;
type ApiNotQualifiedResp = ApiErrorBaseResp<notQualifiedData>;

type ApiErrorResp = ApiExpireResp | ApiNotQualifiedResp;

type ApiResp = ApiErrorResp | ApiSuccessResp;
