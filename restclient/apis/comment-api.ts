/* tslint:disable */
/* eslint-disable */
/**
 * TaskManager
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import globalAxios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
import { Comment } from '../models';
import { CreateCommentScheme } from '../models';
import { UpdateCommentSchema } from '../models';
/**
 * CommentApi - axios parameter creator
 * @export
 */
export const CommentApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {CreateCommentScheme} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createComment: async (body?: CreateCommentScheme, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/comment`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required
            // http bearer authentication required
            if (configuration && configuration.accessToken) {
                const accessToken = typeof configuration.accessToken === 'function'
                    ? await configuration.accessToken()
                    : await configuration.accessToken;
                localVarHeaderParameter["Authorization"] = "Bearer " + accessToken;
            }

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteComment: async (id: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling deleteComment.');
            }
            const localVarPath = `/api/comment/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required
            // http bearer authentication required
            if (configuration && configuration.accessToken) {
                const accessToken = typeof configuration.accessToken === 'function'
                    ? await configuration.accessToken()
                    : await configuration.accessToken;
                localVarHeaderParameter["Authorization"] = "Bearer " + accessToken;
            }

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} [userId] 
         * @param {number} [end] 
         * @param {number} [start] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getComments: async (userId?: string, end?: number, start?: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/comment`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required
            // http bearer authentication required
            if (configuration && configuration.accessToken) {
                const accessToken = typeof configuration.accessToken === 'function'
                    ? await configuration.accessToken()
                    : await configuration.accessToken;
                localVarHeaderParameter["Authorization"] = "Bearer " + accessToken;
            }

            if (userId !== undefined) {
                localVarQueryParameter['UserId'] = userId;
            }

            if (end !== undefined) {
                localVarQueryParameter['End'] = end;
            }

            if (start !== undefined) {
                localVarQueryParameter['Start'] = start;
            }

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} id 
         * @param {UpdateCommentSchema} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateComment: async (id: string, body?: UpdateCommentSchema, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling updateComment.');
            }
            const localVarPath = `/api/comment/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'PATCH', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required
            // http bearer authentication required
            if (configuration && configuration.accessToken) {
                const accessToken = typeof configuration.accessToken === 'function'
                    ? await configuration.accessToken()
                    : await configuration.accessToken;
                localVarHeaderParameter["Authorization"] = "Bearer " + accessToken;
            }

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * CommentApi - functional programming interface
 * @export
 */
export const CommentApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @param {CreateCommentScheme} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createComment(body?: CreateCommentScheme, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<Comment>>> {
            const localVarAxiosArgs = await CommentApiAxiosParamCreator(configuration).createComment(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteComment(id: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<Comment>>> {
            const localVarAxiosArgs = await CommentApiAxiosParamCreator(configuration).deleteComment(id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {string} [userId] 
         * @param {number} [end] 
         * @param {number} [start] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getComments(userId?: string, end?: number, start?: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<Array<Comment>>>> {
            const localVarAxiosArgs = await CommentApiAxiosParamCreator(configuration).getComments(userId, end, start, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {string} id 
         * @param {UpdateCommentSchema} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateComment(id: string, body?: UpdateCommentSchema, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<Comment>>> {
            const localVarAxiosArgs = await CommentApiAxiosParamCreator(configuration).updateComment(id, body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * CommentApi - factory interface
 * @export
 */
export const CommentApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @param {CreateCommentScheme} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createComment(body?: CreateCommentScheme, options?: AxiosRequestConfig): Promise<AxiosResponse<Comment>> {
            return CommentApiFp(configuration).createComment(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteComment(id: string, options?: AxiosRequestConfig): Promise<AxiosResponse<Comment>> {
            return CommentApiFp(configuration).deleteComment(id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} [userId] 
         * @param {number} [end] 
         * @param {number} [start] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getComments(userId?: string, end?: number, start?: number, options?: AxiosRequestConfig): Promise<AxiosResponse<Array<Comment>>> {
            return CommentApiFp(configuration).getComments(userId, end, start, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} id 
         * @param {UpdateCommentSchema} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateComment(id: string, body?: UpdateCommentSchema, options?: AxiosRequestConfig): Promise<AxiosResponse<Comment>> {
            return CommentApiFp(configuration).updateComment(id, body, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * CommentApi - object-oriented interface
 * @export
 * @class CommentApi
 * @extends {BaseAPI}
 */
export class CommentApi extends BaseAPI {
    /**
     * 
     * @param {CreateCommentScheme} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CommentApi
     */
    public async createComment(body?: CreateCommentScheme, options?: AxiosRequestConfig) : Promise<AxiosResponse<Comment>> {
        return CommentApiFp(this.configuration).createComment(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {string} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CommentApi
     */
    public async deleteComment(id: string, options?: AxiosRequestConfig) : Promise<AxiosResponse<Comment>> {
        return CommentApiFp(this.configuration).deleteComment(id, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {string} [userId] 
     * @param {number} [end] 
     * @param {number} [start] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CommentApi
     */
    public async getComments(userId?: string, end?: number, start?: number, options?: AxiosRequestConfig) : Promise<AxiosResponse<Array<Comment>>> {
        return CommentApiFp(this.configuration).getComments(userId, end, start, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {string} id 
     * @param {UpdateCommentSchema} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CommentApi
     */
    public async updateComment(id: string, body?: UpdateCommentSchema, options?: AxiosRequestConfig) : Promise<AxiosResponse<Comment>> {
        return CommentApiFp(this.configuration).updateComment(id, body, options).then((request) => request(this.axios, this.basePath));
    }
}