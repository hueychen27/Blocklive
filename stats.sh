#!/bin/bash
cd backend/storage/sessions/blocklive || exit
du -h ./* | sort -h
echo
cd ../../../..
cd backend/storage/ || exit
du -h -d0 sessions/blocklive
du -h -d0 sessions/scratchprojects
du -h -d0 users
cd ../..
echo
df -h | grep on$
df -h | grep /$
echo
files=(backend/storage/users)
users=${#files[@]}
files=(backend/storage/sessions/blocklive)
projects=${#files[@]}
files=(backend/storage/sessions/scratchprojects)
scratches=${#files[@]}

echo "$users" users, "$projects" bl-projects, "$scratches" scratch-projects
echo
