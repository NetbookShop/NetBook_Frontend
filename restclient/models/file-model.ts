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

 /**
 * 
 *
 * @export
 * @interface FileModel
 */
export interface FileModel {

    /**
     * @type {string}
     * @memberof FileModel
     */
    id: string;

    /**
     * @type {string}
     * @memberof FileModel
     */
    fileName: string;

    /**
     * @type {string}
     * @memberof FileModel
     */
    mimeType?: string | null;

    /**
     * @type {string}
     * @memberof FileModel
     */
    size?: string | null;

    /**
     * @type {string}
     * @memberof FileModel
     */
    filePath: string;
}
