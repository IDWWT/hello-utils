package com.helloutils.hellocode.exception;

public class UtilNotFound extends HelloCodeException {
    private static final String MESSAGE = "Not exist util";

    public UtilNotFound() {
        super(MESSAGE);
    }

    @Override
    public int getStatusCode() {
        return 404;
    }
}
