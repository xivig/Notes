#!/bin/sh
# ==============================================================================
# Script Name: bourne_password_auth.sh (From unix examples.txt & Handbook Ch 39)
# Description: Classic Bourne shell password verification demonstrating spacing rules
# ==============================================================================

VALID_PASSWORD="secret"

echo "Please enter the password:"
read PASSWORD

# Note the strict spacing inside the brackets: [ "$PASSWORD" = "$VALID_PASSWORD" ]
if [ "$PASSWORD" = "$VALID_PASSWORD" ]; then
    echo "You have access!"
else
    echo "ACCESS DENIED!"
fi
