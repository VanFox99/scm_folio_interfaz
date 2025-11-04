#!/bin/bash

kubectl get pods -n credito | \
grep Evicted | \
awk '{print $1 " -n credito"}' | \
xargs -r -L 1 kubectl delete pod --ignore-not-found


kubectl get pods -n credito | \
grep ContainerStatusUnknown | \
awk '{print $1 " -n credito"}' | \
xargs -r -L 1 echo kubectl delete pod --ignore-not-found


kubectl get pods -n credito | \
grep Error | \
awk '{print $1 " -n credito"}' | \
xargs -r -L 1 echo kubectl delete pod --ignore-not-found