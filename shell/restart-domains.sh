#!/usr/bin/env bash

domainspath="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && cd .. && pwd )"
source $domainspath/shell/settings.cfg

echo "relaunching domains..."

for domain in "${domains[@]}"
	do
		echo -ne "	now restarting: "$domain\\n
        cat /dev/null > $domainspath/$domain/data/log/app.log
		/usr/sbin/service $domain stop > /dev/null 2>&1
		sleep 0.1
		/usr/sbin/service $domain start > /dev/null 2>&1
	done

echo -ne \\n"total domains restarted: "${#domains[@]}
echo -ne \\n"done"\\n