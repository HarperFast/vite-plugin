/**
 * OAuth Plugin Type Definitions
 */
import type { IncomingMessage } from 'node:http';
/**
 * Harper Plugin Scope
 * The context object passed to plugin initialization
 */
export interface Scope {
    logger?: Logger;
    /** Plugin configuration from config.yaml */
    options: {
        getAll(): Record<string, any>;
        on(event: 'change', listener: () => void): void;
        on(event: 'error', listener: (error: Error) => void): void;
        on(event: 'ready', listener: () => void): void;
    };
    directory: string;
    /** Resource registration API */
    resources: {
        set(name: string, resource: any): void;
    };
    /** HTTP server middleware registration */
    server: {
        http(handler: (request: any, next: (req: any) => any) => Promise<any>, options?: any): void;
    };
    /** Scope event handlers */
    on(event: 'close', listener: () => void): void;
}
/**
 * Harper User
 * Minimal user interface from Harper core
 */
export interface User {
    username: string;
}
/**
 * Harper Table Instance
 * Methods available on a Harper table
 */
export interface Table {
    get(id: string): Promise<any>;
    put(record: any): Promise<any>;
    delete(id: string): Promise<void>;
}
/**
 * Logger Interface
 */
export interface Logger {
    info?: (message: string, ...args: any[]) => void;
    error?: (message: string, ...args: any[]) => void;
    warn?: (message: string, ...args: any[]) => void;
    debug?: (message: string, ...args: any[]) => void;
}
/**
 * Harper HTTP Request
 * Extended Node.js IncomingMessage with Harper additions
 * Note: Harper doesn't have a specific Request type, it adds properties to IncomingMessage
 */
export interface Request extends IncomingMessage {
    /** Authenticated Harper user or username string */
    user?: User | string;
    headers: IncomingMessage['headers'];
}
/**
 * Request Target
 * Harper's RequestTarget extends URLSearchParams with routing information
 * Note: This is a simplified interface - actual RequestTarget extends URLSearchParams
 */
export interface RequestTarget {
    /** Resource identifier from URL path */
    id?: string;
    pathname?: string;
    /** Inherited from URLSearchParams - get query parameter value */
    get(key: string): string | null;
    /** Additional properties exist on the real RequestTarget */
    [key: string]: any;
}
