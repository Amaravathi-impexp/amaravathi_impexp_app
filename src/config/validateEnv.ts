/**
 * Environment Configuration Validator
 * Run this script to validate your environment configuration
 * 
 * Usage:
 *   npm run validate:env
 */

import config, { isProduction, isDevelopment, isStaging } from './env';

interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validate environment configuration
 */
export function validateEnvironment(): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  console.log('🔍 Validating environment configuration...\n');
  console.log(`📍 Environment: ${config.app.env}`);
  console.log(`📦 App Version: ${config.app.version}`);
  console.log(`🌐 API URL: ${config.api.baseUrl}\n`);

  // Critical validations
  if (!config.api.baseUrl) {
    errors.push('VITE_API_URL is not set');
  }

  if (config.api.baseUrl.includes('localhost') && isProduction()) {
    errors.push('Production API URL should not point to localhost');
  }

  if (config.api.timeout < 5000) {
    warnings.push('API timeout is less than 5 seconds');
  }

  if (config.api.maxRetries > 5) {
    warnings.push('Max retries is greater than 5, may cause performance issues');
  }

  // Production-specific validations
  if (isProduction()) {
    console.log('🔒 Running production validations...\n');

    if (config.api.enableMockFallback) {
      errors.push('Mock API fallback should be disabled in production');
    }

    if (config.features.debugMode) {
      errors.push('Debug mode should be disabled in production');
    }

    if (config.logging.enableConsoleLogs) {
      warnings.push('Console logs are enabled in production - consider disabling');
    }

    if (config.logging.enableReduxDevTools) {
      warnings.push('Redux DevTools are enabled in production - consider disabling');
    }

    // Check third-party services
    if (config.features.errorTracking && !config.services.sentry.dsn) {
      errors.push('Error tracking is enabled but VITE_SENTRY_DSN is not set');
    }

    if (config.features.analytics && !config.services.analytics.id) {
      errors.push('Analytics is enabled but VITE_ANALYTICS_ID is not set');
    }

    if (!config.services.stripe.publicKey || config.services.stripe.publicKey.includes('test')) {
      warnings.push('Stripe public key is not set or using test key in production');
    }

    if (!config.services.googleMaps.apiKey) {
      warnings.push('Google Maps API key is not set');
    }

    // Check storage configuration
    if (config.storage.provider === 'local') {
      warnings.push('Using local storage provider in production - consider using S3/Azure/GCS');
    }

    if (config.storage.provider !== 'local' && !config.storage.bucket) {
      errors.push(`Storage provider is ${config.storage.provider} but bucket is not configured`);
    }

    // Check notifications
    if (config.notifications.email && !config.services.email.apiKey) {
      warnings.push('Email notifications are enabled but email service API key is not set');
    }

    if (config.notifications.sms && !config.services.sms.apiKey) {
      warnings.push('SMS notifications are enabled but SMS provider API key is not set');
    }
  }

  // Development-specific validations
  if (isDevelopment()) {
    console.log('🛠️  Running development validations...\n');

    if (!config.features.debugMode) {
      warnings.push('Debug mode is disabled in development - consider enabling');
    }

    if (!config.logging.enableConsoleLogs) {
      warnings.push('Console logs are disabled in development - consider enabling');
    }

    if (!config.logging.enableReduxDevTools) {
      warnings.push('Redux DevTools are disabled in development - consider enabling');
    }
  }

  // File upload validations
  if (config.fileUpload.maxSize > 104857600) { // 100MB
    warnings.push('Max file size is greater than 100MB - may cause performance issues');
  }

  if (config.fileUpload.allowedExtensions.length === 0) {
    warnings.push('No file extensions are configured');
  }

  // Cache validations
  if (config.cache.enabled && config.cache.ttl < 60000) {
    warnings.push('Cache TTL is less than 1 minute - may not be effective');
  }

  // Security validations
  if (config.security.corsOrigins.length === 0) {
    warnings.push('No CORS origins configured');
  }

  if (config.security.rateLimit.requests > 1000) {
    warnings.push('Rate limit is very high (>1000 requests per window)');
  }

  // Display results
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  if (errors.length === 0 && warnings.length === 0) {
    console.log('✅ All validations passed!\n');
    return { valid: true, errors: [], warnings: [] };
  }

  if (errors.length > 0) {
    console.log('❌ ERRORS:\n');
    errors.forEach((error, index) => {
      console.log(`   ${index + 1}. ${error}`);
    });
    console.log('');
  }

  if (warnings.length > 0) {
    console.log('⚠️  WARNINGS:\n');
    warnings.forEach((warning, index) => {
      console.log(`   ${index + 1}. ${warning}`);
    });
    console.log('');
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  if (errors.length > 0) {
    console.log('❌ Validation failed. Please fix the errors above.\n');
    return { valid: false, errors, warnings };
  }

  console.log('⚠️  Validation passed with warnings. Review warnings above.\n');
  return { valid: true, errors: [], warnings };
}

/**
 * Display configuration summary
 */
export function displayConfigSummary(): void {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📋 CONFIGURATION SUMMARY');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  console.log('Application:');
  console.log(`  Name: ${config.app.name}`);
  console.log(`  Version: ${config.app.version}`);
  console.log(`  Environment: ${config.app.env}\n`);

  console.log('API Configuration:');
  console.log(`  Base URL: ${config.api.baseUrl}`);
  console.log(`  Timeout: ${config.api.timeout}ms`);
  console.log(`  Max Retries: ${config.api.maxRetries}`);
  console.log(`  Mock Fallback: ${config.api.enableMockFallback ? '✅' : '❌'}\n`);

  console.log('Features:');
  console.log(`  Analytics: ${config.features.analytics ? '✅' : '❌'}`);
  console.log(`  Error Tracking: ${config.features.errorTracking ? '✅' : '❌'}`);
  console.log(`  Performance Monitoring: ${config.features.performanceMonitoring ? '✅' : '❌'}`);
  console.log(`  Debug Mode: ${config.features.debugMode ? '✅' : '❌'}\n`);

  console.log('Third-Party Services:');
  console.log(`  Stripe: ${config.services.stripe.publicKey ? '✅' : '❌'}`);
  console.log(`  Google Maps: ${config.services.googleMaps.apiKey ? '✅' : '❌'}`);
  console.log(`  Email Service: ${config.services.email.apiKey ? '✅' : '❌'}`);
  console.log(`  Analytics: ${config.services.analytics.id ? '✅' : '❌'}`);
  console.log(`  Sentry: ${config.services.sentry.dsn ? '✅' : '❌'}`);
  console.log(`  SMS Provider: ${config.services.sms.apiKey ? '✅' : '❌'}\n`);

  console.log('Storage:');
  console.log(`  Provider: ${config.storage.provider}`);
  console.log(`  Bucket: ${config.storage.bucket || 'Not configured'}`);
  console.log(`  Region: ${config.storage.region}\n`);

  console.log('Logging:');
  console.log(`  Level: ${config.logging.level}`);
  console.log(`  Console Logs: ${config.logging.enableConsoleLogs ? '✅' : '❌'}`);
  console.log(`  Redux DevTools: ${config.logging.enableReduxDevTools ? '✅' : '❌'}\n`);

  console.log('Security:');
  console.log(`  CORS Origins: ${config.security.corsOrigins.join(', ')}`);
  console.log(`  CSP Enabled: ${config.security.cspEnabled ? '✅' : '❌'}`);
  console.log(`  Rate Limit: ${config.security.rateLimit.requests} requests per ${config.security.rateLimit.window}ms\n`);

  console.log('File Upload:');
  console.log(`  Max Size: ${(config.fileUpload.maxSize / 1048576).toFixed(2)}MB`);
  console.log(`  Allowed Extensions: ${config.fileUpload.allowedExtensions.join(', ')}\n`);

  console.log('Notifications:');
  console.log(`  Email: ${config.notifications.email ? '✅' : '❌'}`);
  console.log(`  SMS: ${config.notifications.sms ? '✅' : '❌'}\n`);

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

/**
 * Run validation if executed directly
 */
if (import.meta.url === new URL(import.meta.url).href) {
  displayConfigSummary();
  const result = validateEnvironment();
  
  if (!result.valid) {
    process.exit(1);
  }
}

export default validateEnvironment;
