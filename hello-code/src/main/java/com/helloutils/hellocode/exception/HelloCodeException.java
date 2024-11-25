package com.helloutils.hellocode.exception;

public abstract class HelloCodeException extends RuntimeException{
    public HelloCodeException(String message) {
        super(message);
    }

    public HelloCodeException(String message, Throwable cause) {
        super(message, cause);
    }

    public abstract int getStatusCode();

}
