echo -e "\e[32mAplicacion cd-construction.sh\e[0m"
echo ""
read -r -p "Ingrese nombre de pipeline CI - ejemplo: api-servicio-pipeline-ci (enter for default value): " CI_NAME
CI_NAME=${CI_NAME:-api-servicio-pipeline-ci}

CD_NAME="${CI_NAME%-ci}-cd"


echo -e "\e[33mTipo de consumo (Gateway[1]/Ingress[2]):\e[0m"
read -r -p "(enter for default value 1): " TYPE
TYPE=${TYPE:-1}

find pipelines/ -type f -mtime +7 -exec rm {} \ > /dev/null 2>&1;
mkdir pipelines 2>/dev/null
TEMPLATE_FILE="${CD_NAME}.json"
cp Template-Java-CD.json ${TEMPLATE_FILE}
mv ${TEMPLATE_FILE} pipelines/
TEMPLATE_FILE_PATH="pipelines/${TEMPLATE_FILE}"
case "$TYPE" in
  1)
    echo "Construyendo template para Gateway..."
    read -r -p "Ingrese GW_NAMESPACE - ejemplo: global-ns-infra-gw (enter for default value): " GW_NAMESPACE
    GW_NAMESPACE=${GW_NAMESPACE:-global-ns-infra-gw}
    sed -i "s#TRAFIC_TYPE_NAMESPACE#$GW_NAMESPACE#g" "${TEMPLATE_FILE_PATH}"
    sed -i "s#BRANCH_CONFIG#master#g" "${TEMPLATE_FILE_PATH}"
    sed -i "s#k8PATH#frameworks/k8Templates/k8s-manifest-template-gke-npv.yaml#g" "${TEMPLATE_FILE_PATH}"
    ;;
  2)
    echo "Construyendo template para Ingress..."
    read -r -p "Ingrese INGRESS_NAMESPACE (enter for default value): " INGRESS_NAMESPACE
    INGRESS_NAMESPACE=${INGRESS_NAMESPACE:-default-ingress-ns}
    sed -i "s#TRAFIC_TYPE_NAMESPACE#$INGRESS_NAMESPACE#g" "${TEMPLATE_FILE_PATH}"
    sed -i "s#BRANCH_CONFIG#config-cadenaSuministro#g" "${TEMPLATE_FILE_PATH}"
    sed -i "s#k8PATH#frameworks/k8Templates/k8s-manifest-template-GCP-v2.yaml#g" "${TEMPLATE_FILE_PATH}"
    ;;
  *)
    echo "Opción inválida, usando Gateway por defecto."
    echo "Construyendo template para Gateway..."
    read -r -p "Ingrese GW_NAMESPACE - ejemplo: global-ns-infra-gw (enter for default value): " GW_NAMESPACE
    GW_NAMESPACE=${GW_NAMESPACE:-global-ns-infra-gw}
    sed -i "s#TRAFIC_TYPE_NAMESPACE#$GW_NAMESPACE#g" "${TEMPLATE_FILE_PATH}"
    sed -i "s#BRANCH_CONFIG#master#g" "${TEMPLATE_FILE_PATH}"
    sed -i "s#k8PATH#frameworks/k8Templates/k8s-manifest-template-gke-npv.yaml#g" "${TEMPLATE_FILE_PATH}"
    ;;
esac


read -r -p "Ingrese API_PATH - ejemplo: /api/v1/servicio (enter for default value): " API_PATH
API_PATH=${API_PATH:-"/api/v1/servicio"}
read -r -p "Ingrese WORKLOAD_NAMESPACE - ejemplo: namespace (enter for default value): " WORKLOAD_NAMESPACE
WORKLOAD_NAMESPACE=${WORKLOAD_NAMESPACE:-namespace}
read -r -p "Ingrese HEALTH_CHECK_LIVENESS_PATH - ejemplo: /hc/liveness (enter for default value): " HEALTH_CHECK_LIVENESS
HEALTH_CHECK_LIVENESS=${HEALTH_CHECK_LIVENESS:-"/hc/liveness"}
HEALTH_CHECK_LIVENESS_PATH="${API_PATH}${HEALTH_CHECK_LIVENESS}"
read -r -p "Ingrese HEALTH_CHECK_READINES_PATH - ejemplo: /hc/readiness (enter for default value): " HEALTH_CHECK_READINESS
HEALTH_CHECK_READINESS=${HEALTH_CHECK_READINESS:-"/hc/readiness"}
HEALTH_CHECK_READINESS_PATH="${API_PATH}${HEALTH_CHECK_READINESS}"
read -r -p "Ingrese DNS_DEV - ejemplo: project-dev.coppel.io (enter for default value): " DNS_DEV
DNS_DEV=${DNS_DEV:-project-dev.coppel.io}
read -r -p "Ingrese DNS_QA - ejemplo: project-qa.coppel.io (enter for default value): " DNS_QA
DNS_QA=${DNS_QA:-project-qa.coppel.io}
read -r -p "Ingrese DNS_STAGING - ejemplo: project-staging.coppel.io (enter for default value): " DNS_STAGING
DNS_STAGING=${DNS_STAGING:-project-staging.coppel.io}
read -r -p "Ingrese DNS_PRODUCCION - ejemplo: ssff-project.coppel.io (enter for default value): " DNS_PRODUCCION
DNS_PRODUCCION=${DNS_PRODUCCION:-ssff-project.coppel.io}


sed -i "s#API_PATH#$API_PATH#g" "${TEMPLATE_FILE_PATH}"
sed -i "s#WORKLOAD_NAMESPACE#$WORKLOAD_NAMESPACE#g" "${TEMPLATE_FILE_PATH}"
sed -i "s#HEALTH_CHECK_LIVENESS_PATH#$HEALTH_CHECK_LIVENESS_PATH#g" "${TEMPLATE_FILE_PATH}"
sed -i "s#HEALTH_CHECK_READINES_PATH#$HEALTH_CHECK_READINESS_PATH#g" "${TEMPLATE_FILE_PATH}"
sed -i "s#DNS_DEV#$DNS_DEV#g" "${TEMPLATE_FILE_PATH}"
sed -i "s#DNS_QA#$DNS_QA#g" "${TEMPLATE_FILE_PATH}"
sed -i "s#DNS_STAGING#$DNS_STAGING#g" "${TEMPLATE_FILE_PATH}"
sed -i "s#DNS_PRODUCCION#$DNS_PRODUCCION#g" "${TEMPLATE_FILE_PATH}"
sed -i "s#CI_NAME#$CI_NAME#g" "${TEMPLATE_FILE_PATH}"


echo ""
echo -e "\e[32mJSON generado en ${TEMPLATE_FILE_PATH}\e[0m"
