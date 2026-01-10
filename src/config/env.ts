/**
 * Environment Configuration Utility
 * Provides type-safe access to environment variables with validation
 */

/**
 * Environment types
 */
export type Environment = 'development' | 'staging' | 'production' | 'test';

/**
 * Configuration interface with all environment variables
 */
interface Config {
  // Application
  app: {
    name: string;
    version: string;
    env: Environment;
  };

  // API Configuration
  api: {
    baseUrl: string;
    timeout: number;
    maxRetries: number;
    retryDelay: number;
    enableMockFallback: boolean;
    enableLogging: boolean;
  };

  // API Endpoints (Multiple Microservices)
  apiEndpoints: {
    tradeIdentity: string; // Authentication, users
    tradeOperation: string; // Shipments, partners, logistics
  };

  // Authentication
  auth: {
    tokenStorageKey: string;
    tokenExpiryHours: number;
    sessionTimeout: number;
    enableTokenRefresh: boolean;
    tokenRefreshBeforeExpiry: number;
  };

  // Feature Flags
  features: {
    analytics: boolean;
    errorTracking: boolean;
    performanceMonitoring: boolean;
    debugMode: boolean;
  };

  // Third-Party Services
  services: {
    stripe: {
      publicKey: string;
    };
    googleMaps: {
      apiKey: string;
    };
    email: {
      apiKey: string;
    };
    analytics: {
      id: string;
    };
    sentry: {
      dsn: string;
    };
    sms: {
      apiKey: string;
    };
  };

  // File Upload
  fileUpload: {
    maxSize: number;
    allowedExtensions: string[];
  };

  // Storage
  storage: {
    provider: 'local' | 's3' | 'azure' | 'gcs';
    bucket: string;
    region: string;
  };

  // Logging
  logging: {
    level: 'debug' | 'info' | 'warn' | 'error';
    enableConsoleLogs: boolean;
    enableReduxDevTools: boolean;
  };

  // Security
  security: {
    corsOrigins: string[];
    cspEnabled: boolean;
    rateLimit: {
      requests: number;
      window: number;
    };
  };

  // Notifications
  notifications: {
    email: boolean;
    sms: boolean;
  };

  // Internationalization
  i18n: {
    defaultLanguage: string;
    supportedLanguages: string[];
  };

  // Pagination
  pagination: {
    defaultPageSize: number;
    maxPageSize: number;
  };

  // Cache
  cache: {
    enabled: boolean;
    ttl: number;
  };

  // Development
  dev: {
    enableHMR: boolean;
    port: number;
  };
}

/**
 * Get environment variable with fallback
 */
const getEnvVar = (key: string, defaultValue: string = ''): string => {
  return import.meta.env[key] || defaultValue;
};

/**
 * Get boolean environment variable
 */
const getBoolEnvVar = (key: string, defaultValue: boolean = false): boolean => {
  const value = import.meta.env[key];
  if (value === undefined || value === null || value === '') {
    return defaultValue;
  }
  return value === 'true' || value === true;
};

/**
 * Get number environment variable
 */
const getNumberEnvVar = (key: string, defaultValue: number = 0): number => {
  const value = import.meta.env[key];
  if (value === undefined || value === null || value === '') {
    return defaultValue;
  }
  const parsed = Number(value);
  return isNaN(parsed) ? defaultValue : parsed;
};

/**
 * Get array environment variable (comma-separated)
 */
const getArrayEnvVar = (key: string, defaultValue: string[] = []): string[] => {
  const value = import.meta.env[key];
  if (value === undefined || value === null || value === '') {
    return defaultValue;
  }
  return value.split(',').map((item: string) => item.trim()).filter(Boolean);
};

/**
 * Validate required environment variables
 */
const validateConfig = (config: Config): void => {
  const errors: string[] = [];

  // Check required production variables
  if (config.app.env === 'production') {
    if (!config.api.baseUrl || config.api.baseUrl.includes('localhost')) {
      errors.push('VITE_API_URL must be set to a production URL');
    }

    if (config.features.errorTracking && !config.services.sentry.dsn) {
      errors.push('VITE_SENTRY_DSN must be set when error tracking is enabled');
    }

    if (config.features.analytics && !config.services.analytics.id) {
      errors.push('VITE_ANALYTICS_ID must be set when analytics is enabled');
    }

    if (config.logging.enableConsoleLogs) {
      console.warn('⚠️ Console logs are enabled in production. Consider disabling for security.');
    }

    if (config.logging.enableReduxDevTools) {
      console.warn('⚠️ Redux DevTools are enabled in production. Consider disabling for security.');
    }
  }

  // Validate API configuration
  if (config.api.timeout < 5000) {
    console.warn('⚠️ API timeout is less than 5 seconds. This may cause issues.');
  }

  if (config.api.maxRetries > 5) {
    console.warn('⚠️ API max retries is greater than 5. This may cause performance issues.');
  }

  // Validate file upload size
  if (config.fileUpload.maxSize > 104857600) { // 100MB
    console.warn('⚠️ Max file size is greater than 100MB. This may cause performance issues.');
  }

  // Throw errors if critical validation fails
  if (errors.length > 0) {
    throw new Error(`Environment Configuration Errors:\n${errors.join('\n')}`);
  }
};

/**
 * Create configuration object from environment variables
 */
const createConfig = (): Config => {
  const config: Config = {
    app: {
      name: getEnvVar('VITE_APP_NAME', 'Amaravathi Imports & Exports'),
      version: getEnvVar('VITE_APP_VERSION', '1.0.0'),
      env: getEnvVar('VITE_APP_ENV', 'development') as Environment,
    },

    api: {
      baseUrl: getEnvVar('VITE_API_URL', 'http://localhost:8081/api/trade-identity/v1'),
      timeout: getNumberEnvVar('VITE_API_TIMEOUT', 30000),
      maxRetries: getNumberEnvVar('VITE_API_MAX_RETRIES', 3),
      retryDelay: getNumberEnvVar('VITE_API_RETRY_DELAY', 1000),
      enableMockFallback: getBoolEnvVar('VITE_ENABLE_MOCK_FALLBACK', true),
      enableLogging: getBoolEnvVar('VITE_ENABLE_API_LOGGING', false),
    },

    apiEndpoints: {
      tradeIdentity: getEnvVar('VITE_API_TRADE_IDENTITY_URL', 'http://localhost:8081/api/trade-identity/v1'),
      tradeOperation: getEnvVar('VITE_API_TRADE_OPERATION_URL', 'http://localhost:8082/api/trade-operation/v1'),
    },

    auth: {
      tokenStorageKey: getEnvVar('VITE_TOKEN_STORAGE_KEY', 'amaravathi_auth_token'),
      tokenExpiryHours: getNumberEnvVar('VITE_TOKEN_EXPIRY_HOURS', 24),
      sessionTimeout: getNumberEnvVar('VITE_SESSION_TIMEOUT', 30),
      enableTokenRefresh: getBoolEnvVar('VITE_ENABLE_TOKEN_REFRESH', true),
      tokenRefreshBeforeExpiry: getNumberEnvVar('VITE_TOKEN_REFRESH_BEFORE_EXPIRY', 300000),
    },

    features: {
      analytics: getBoolEnvVar('VITE_ENABLE_ANALYTICS', false),
      errorTracking: getBoolEnvVar('VITE_ENABLE_ERROR_TRACKING', false),
      performanceMonitoring: getBoolEnvVar('VITE_ENABLE_PERFORMANCE_MONITORING', false),
      debugMode: getBoolEnvVar('VITE_ENABLE_DEBUG_MODE', false),
    },

    services: {
      stripe: {
        publicKey: getEnvVar('VITE_STRIPE_PUBLIC_KEY', ''),
      },
      googleMaps: {
        apiKey: getEnvVar('VITE_GOOGLE_MAPS_API_KEY', ''),
      },
      email: {
        apiKey: getEnvVar('VITE_EMAIL_SERVICE_API_KEY', ''),
      },
      analytics: {
        id: getEnvVar('VITE_ANALYTICS_ID', ''),
      },
      sentry: {
        dsn: getEnvVar('VITE_SENTRY_DSN', ''),
      },
      sms: {
        apiKey: getEnvVar('VITE_SMS_PROVIDER_API_KEY', ''),
      },
    },

    fileUpload: {
      maxSize: getNumberEnvVar('VITE_MAX_FILE_SIZE', 10485760), // 10MB
      allowedExtensions: getArrayEnvVar('VITE_ALLOWED_FILE_EXTENSIONS', ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png', '.xlsx', '.xls']),
    },

    storage: {
      provider: getEnvVar('VITE_STORAGE_PROVIDER', 'local') as 'local' | 's3' | 'azure' | 'gcs',
      bucket: getEnvVar('VITE_STORAGE_BUCKET', ''),
      region: getEnvVar('VITE_STORAGE_REGION', 'us-east-1'),
    },

    logging: {
      level: getEnvVar('VITE_LOG_LEVEL', 'info') as 'debug' | 'info' | 'warn' | 'error',
      enableConsoleLogs: getBoolEnvVar('VITE_ENABLE_CONSOLE_LOGS', true),
      enableReduxDevTools: getBoolEnvVar('VITE_ENABLE_REDUX_DEVTOOLS', true),
    },

    security: {
      corsOrigins: getArrayEnvVar('VITE_CORS_ORIGINS', ['http://localhost:5173', 'http://localhost:3000']),
      cspEnabled: getBoolEnvVar('VITE_CSP_ENABLED', false),
      rateLimit: {
        requests: getNumberEnvVar('VITE_RATE_LIMIT_REQUESTS', 100),
        window: getNumberEnvVar('VITE_RATE_LIMIT_WINDOW', 60000),
      },
    },

    notifications: {
      email: getBoolEnvVar('VITE_ENABLE_EMAIL_NOTIFICATIONS', true),
      sms: getBoolEnvVar('VITE_ENABLE_SMS_NOTIFICATIONS', false),
    },

    i18n: {
      defaultLanguage: getEnvVar('VITE_DEFAULT_LANGUAGE', 'en'),
      supportedLanguages: getArrayEnvVar('VITE_SUPPORTED_LANGUAGES', ['en', 'es', 'fr', 'de', 'zh']),
    },

    pagination: {
      defaultPageSize: getNumberEnvVar('VITE_DEFAULT_PAGE_SIZE', 10),
      maxPageSize: getNumberEnvVar('VITE_MAX_PAGE_SIZE', 100),
    },

    cache: {
      enabled: getBoolEnvVar('VITE_ENABLE_CACHE', true),
      ttl: getNumberEnvVar('VITE_CACHE_TTL', 300000), // 5 minutes
    },

    dev: {
      enableHMR: getBoolEnvVar('VITE_ENABLE_HMR', true),
      port: getNumberEnvVar('VITE_PORT', 5173),
    },
  };

  // Validate configuration in production
  if (config.app.env === 'production' || config.app.env === 'staging') {
    validateConfig(config);
  }

  return config;
};

/**
 * Application configuration singleton
 */
export const config = createConfig();

/**
 * Check if running in production
 */
export const isProduction = (): boolean => {
  return config.app.env === 'production';
};

/**
 * Check if running in development
 */
export const isDevelopment = (): boolean => {
  return config.app.env === 'development';
};

/**
 * Check if running in staging
 */
export const isStaging = (): boolean => {
  return config.app.env === 'staging';
};

/**
 * Check if debug mode is enabled
 */
export const isDebugMode = (): boolean => {
  return config.features.debugMode;
};

/**
 * Log configuration (only in development)
 */
if (isDevelopment() && config.logging.enableConsoleLogs) {
  console.log('🚀 Environment Configuration:', {
    environment: config.app.env,
    tradeIdentityAPI: config.apiEndpoints.tradeIdentity,
    tradeOperationAPI: config.apiEndpoints.tradeOperation,
    mockAPI: config.api.enableMockFallback,
    apiLogging: config.api.enableLogging,
    version: config.app.version,
  });
}

/**
 * Export config as default
 */
export default config;