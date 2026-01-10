/**
 * Simple Production-Safe Logger
 * 100% Free - No external service needed
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: any;
  userAgent?: string;
  url?: string;
}

class Logger {
  private isDevelopment = import.meta.env.DEV;
  private maxStoredLogs = 100; // Keep last 100 logs
  private logBuffer: LogEntry[] = [];

  /**
   * Log info message
   */
  info(message: string, context?: any): void {
    this.log('info', message, context);
  }

  /**
   * Log warning message
   */
  warn(message: string, context?: any): void {
    this.log('warn', message, context);
  }

  /**
   * Log error message
   */
  error(message: string, context?: any): void {
    this.log('error', message, context);
  }

  /**
   * Log debug message (only in development)
   */
  debug(message: string, context?: any): void {
    if (this.isDevelopment) {
      this.log('debug', message, context);
    }
  }

  /**
   * Core logging function
   */
  private log(level: LogLevel, message: string, context?: any): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context: this.sanitizeContext(context),
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    // Store in buffer (for download feature)
    this.addToBuffer(entry);

    // Console output (only in development)
    if (this.isDevelopment) {
      this.logToConsole(entry);
    } else {
      // Production: Only log errors (not full context)
      if (level === 'error') {
        console.error(`[${entry.timestamp}] ${message}`);
      }
    }

    // Optional: Send to backend logging endpoint
    if (!this.isDevelopment && level === 'error') {
      this.sendToBackend(entry);
    }
  }

  /**
   * Log to console with formatting
   */
  private logToConsole(entry: LogEntry): void {
    const style = this.getConsoleStyle(entry.level);
    console.log(
      `%c[${entry.level.toUpperCase()}] ${entry.timestamp}`,
      style,
      entry.message,
      entry.context || ''
    );
  }

  /**
   * Get console styling based on log level
   */
  private getConsoleStyle(level: LogLevel): string {
    switch (level) {
      case 'error':
        return 'color: #ef4444; font-weight: bold;';
      case 'warn':
        return 'color: #f59e0b; font-weight: bold;';
      case 'info':
        return 'color: #3b82f6;';
      case 'debug':
        return 'color: #6b7280;';
      default:
        return '';
    }
  }

  /**
   * Remove sensitive data from context
   */
  private sanitizeContext(context: any): any {
    if (!context) return undefined;

    // Clone to avoid modifying original
    const sanitized = JSON.parse(JSON.stringify(context));

    // Remove sensitive fields
    const sensitiveKeys = [
      'password',
      'token',
      'accessToken',
      'refreshToken',
      'apiKey',
      'secret',
      'authorization',
    ];

    const removeSensitive = (obj: any): any => {
      if (typeof obj !== 'object' || obj === null) return obj;

      Object.keys(obj).forEach((key) => {
        if (sensitiveKeys.some((sk) => key.toLowerCase().includes(sk))) {
          obj[key] = '[REDACTED]';
        } else if (typeof obj[key] === 'object') {
          removeSensitive(obj[key]);
        }
      });

      return obj;
    };

    return removeSensitive(sanitized);
  }

  /**
   * Add log to in-memory buffer
   */
  private addToBuffer(entry: LogEntry): void {
    this.logBuffer.push(entry);

    // Keep only last N logs
    if (this.logBuffer.length > this.maxStoredLogs) {
      this.logBuffer.shift();
    }
  }

  /**
   * Send error log to backend (optional)
   */
  private async sendToBackend(entry: LogEntry): Promise<void> {
    try {
      // Optional: Send to your own backend logging endpoint
      // This is free if you have your own backend
      if (import.meta.env.VITE_API_LOGGING_ENABLED === 'true') {
        await fetch(
          `${import.meta.env.VITE_API_TRADE_OPERATION_URL}/logs/client-errors`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(entry),
          }
        );
      }
    } catch (error) {
      // Silently fail - don't log errors about logging!
      // In development, we can see this
      if (this.isDevelopment) {
        console.warn('Failed to send log to backend:', error);
      }
    }
  }

  /**
   * Get all stored logs
   */
  getLogs(): LogEntry[] {
    return [...this.logBuffer];
  }

  /**
   * Download logs as JSON file
   * Useful for users to send you logs when reporting issues
   */
  downloadLogs(): void {
    const dataStr = JSON.stringify(this.logBuffer, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `logs-${new Date().toISOString()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  /**
   * Clear all stored logs
   */
  clearLogs(): void {
    this.logBuffer = [];
  }
}

// Export singleton instance
export const logger = new Logger();

// Global error handler (catches unhandled errors)
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    logger.error('Uncaught Error', {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      error: event.error?.stack,
    });
  });

  window.addEventListener('unhandledrejection', (event) => {
    logger.error('Unhandled Promise Rejection', {
      reason: event.reason,
    });
  });
}
