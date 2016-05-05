#!/usr/bin/env bash

domainspath="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && cd .. && pwd )"
source $domainspath/shell/settings.cfg

echo "checking for required folders..."
for domain in "${domains[@]}"
do
	echo -ne $domain\\n
	cd $domainspath/$domain/data

	echo -ne "	creating symbolic link..."
	ln -s $domainspath/$domain/data/init /etc/init.d/$domain > /dev/null 2>&1
	echo -ne "		done"\\n

	for item in "${dirs[@]}"
	do
		echo -ne "	creating dir: $item"
		mkdir -p $item
		echo -ne ", owner: $owner..."
		chown $owner:$owner $item
		echo -ne "	done"\\n
	done
done

echo -ne \\n"total domains checked: "${#domains[@]}
echo -ne \\n"done"\\n\\n