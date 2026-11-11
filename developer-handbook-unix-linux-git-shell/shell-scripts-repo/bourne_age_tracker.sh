#!/bin/sh
# ==============================================================================
# Script Name: bourne_age_tracker.sh (From unix examples.txt & Handbook Ch 39)
# Description: Persistent file state tracking and multi-tier age validation
# ==============================================================================

echo "Please enter your name:"
read USERNAME

# Check if data file exists and is not empty (-s)
if [ -s "${USERNAME}_DAT" ]; then
    # Read age from file via command substitution
    AGE=$(cat "${USERNAME}_DAT")
    echo "You are $AGE years old!"
else
    echo "How old are you?"
    read AGE

    if [ "$AGE" -le 2 ]; then
        echo "You are too young!"
    else
        if [ "$AGE" -ge 100 ]; then
            echo "You are too old!"
        else
            if [ "$AGE" -lt 20 ] || [ "$AGE" -ge 50 ]; then
                echo "Sorry, you are out of the age range."
            elif [ "$AGE" -ge 20 ] && [ "$AGE" -lt 30 ]; then
                echo "You are in your 20s"
            elif [ "$AGE" -ge 30 ] && [ "$AGE" -lt 40 ]; then
                echo "You are in your 30s"
            elif [ "$AGE" -ge 40 ] && [ "$AGE" -lt 50 ]; then
                echo "You are in your 40s"
            fi
            # Persist age to data file
            echo "$AGE" > "${USERNAME}_DAT"
            echo "Registered age $AGE in file '${USERNAME}_DAT'."
        fi
    fi
fi
