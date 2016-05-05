#!/usr/bin/env bash

domainspath="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && cd .. && pwd )"
source $domainspath/shell/settings.cfg

NC='\033[0m' # No Color
Red='\033[0;31m'
Green='\033[0;32m'
LightCyan='\033[1;36m'

echo "checking for required folders..."
for domain in "${domains[@]}"
do
	echo -ne ${LightCyan}$domain${NC}\\n
	cd $domainspath/$domain/data

	echo -ne "	creating symbolic link..."
	ln -s $domainspath/$domain/data/init /etc/init.d/$domain > /dev/null 2>&1
	echo -ne ${Green}"		done"${NC}\\n

	for item in "${dirs[@]}"
	do
		echo -ne "	creating dir: $item"
		mkdir -p $item
		echo -ne ", owner: $owner..."
		chown $owner:$owner $item
		echo -ne ${Green}"	done"${NC}\\n
	done
done

echo -ne \\n"total domains checked: "${LightCyan}${#domains[@]}${NC}
echo -ne \\n"${Green}done${NC}"\\n\\n