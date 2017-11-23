/**
 * Config interface.
 *
 * NOTE: `ConfigLoader` loads the appropriate config based on argv.env
 *
 * E.g. Local => LocalConfig.js
 *      Prod => ProdConfig.js
 */
export interface IConfig {
    logLevel: string;
    logFile: string;
}
