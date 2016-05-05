#!/usr/bin/env bash

domainspath="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && cd .. && pwd )"
source $domainspath/shell/settings.cfg

NC='\033[0m' # No Color
Red='\033[0;31m'
Green='\033[0;32m'
LightCyan='\033[1;36m'

echo "relaunching domains..."

for domain in "${domains[@]}"
	do
		echo -ne "	now restarting: "${LightCyan}$domain${NC}\\n
		/usr/sbin/service $domain stop > /dev/null 2>&1
		sleep 5
		/usr/sbin/service $domain start > /dev/null 2>&1
	done

echo -ne \\n"total domains restarted: "${LightCyan}${#domains[@]}${NC}
echo -ne \\n"${Green}done${NC}"\\n
