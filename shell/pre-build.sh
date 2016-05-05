#!/usr/bin/env bash

NC='\033[0m' # No Color
Black='\033[0;30m'
DarkGray='\033[1;30m'
Red='\033[0;31m'
LightRed='\033[1;31m'
Green='\033[0;32m'
LightGreen='\033[1;32m'
BrownOrange='\033[0;33m'
Yellow='\033[1;33m'
Blue='\033[0;34m'
LightBlue='\033[1;34m'
Purple='\033[0;35m'
LightPurple='\033[1;35m'
Cyan='\033[0;36m'
LightCyan='\033[1;36m'
LightGray='\033[0;37m'
White='\033[1;37m'

cd $( cd "$( dirname "${BASH_SOURCE[0]}" )" && cd .. && pwd )
find . -name app.log -printf '%s %p\n' | sort -nr | awk '{$1/=1024;printf $2" %.2fMB\n",$1}' | column -t