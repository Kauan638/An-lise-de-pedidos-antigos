// =====================================
// DASHBOARD
// =====================================

let graficoStatus = null;
let graficoLojas = null;
let graficoEtiquetas = null;


// =====================================
// DASHBOARD PRINCIPAL
// =====================================

function atualizarDashboard(){

    document.getElementById("kpiTotal").innerText =
    resultado.length;

    document.getElementById("kpiSemMaster").innerText =
    resultado.filter(
        x=>x.Situacao==="🔴 Sem Master"
    ).length;

    document.getElementById("kpiComMaster").innerText =
    resultado.filter(
        x=>x.Situacao==="🟢 Com Master"
    ).length;

    document.getElementById("kpiMasterAntiga").innerText =
    resultado.filter(
        x=>x.Situacao==="🟠 Master Antiga"
    ).length;

    document.getElementById("kpiLojas").innerText =
    new Set(resultado.map(x=>x.Loja)).size;

    document.getElementById("kpiProdutos").innerText =
    new Set(resultado.map(x=>x.Produto)).size;

    document.getElementById("kpiAguardando").innerText =
    resultado.filter(
        x=>(x.SituacaoEtiqueta || "")
        .includes("Aguardando")
    ).length;

    document.getElementById("kpiMontagem").innerText =
    resultado.filter(
        x=>(x.StatusMaster || "")
        .includes("Em Montagem")
    ).length;

    document.getElementById("kpiMontadas").innerText =
    resultado.filter(
        x=>(x.SituacaoEtiqueta || "")
        .includes("Montada")
    ).length;

    document.getElementById("kpiNaoChecada").innerText =
    resultado.filter(
        x=>(x.SituacaoEtiqueta || "")
        .includes("Não Checada")
    ).length;

    document.getElementById("kpiCanceladas").innerText =
    resultado.filter(
        x=>(x.SituacaoEtiqueta || "")
        .includes("Cancelada")
    ).length;

    atualizarGraficoStatus();
    atualizarGraficoLojas();
    atualizarGraficoEtiquetas();
}


// =====================================
// GRAFICO STATUS
// =====================================

function atualizarGraficoStatus(){

    const ctx =
    document.getElementById("graficoStatus");

    if(!ctx) return;

    if(graficoStatus)
        graficoStatus.destroy();

    graficoStatus = new Chart(ctx,{
        type:"doughnut",

        data:{
            labels:[
                "Sem Master",
                "Com Master",
                "Master Antiga"
            ],

            datasets:[{
                data:[
                    resultado.filter(x=>x.Situacao==="🔴 Sem Master").length,
                    resultado.filter(x=>x.Situacao==="🟢 Com Master").length,
                    resultado.filter(x=>x.Situacao==="🟠 Master Antiga").length
                ],

                backgroundColor:[
                    "#ef4444",
                    "#22c55e",
                    "#f59e0b"
                ]
            }]
        }
    });

}


// =====================================
// GRAFICO LOJAS
// =====================================

function atualizarGraficoLojas(){

    const ctx =
    document.getElementById("graficoLojas");

    if(!ctx) return;

    const mapa = {};

    resultado.forEach(item=>{

        mapa[item.Loja] =
        (mapa[item.Loja] || 0) + 1;

    });

    const ranking =
    Object.entries(mapa)
    .sort((a,b)=>b[1]-a[1])
    .slice(0,10);

    if(graficoLojas)
        graficoLojas.destroy();

    graficoLojas = new Chart(ctx,{

        type:"bar",

        data:{
            labels: ranking.map(x=>x[0]),

            datasets:[{
                data: ranking.map(x=>x[1]),
                backgroundColor:"#3b82f6"
            }]
        }
    });

}


// =====================================
// GRAFICO ETIQUETAS
// =====================================

function atualizarGraficoEtiquetas(){

    const ctx =
    document.getElementById("graficoEtiquetas");

    if(!ctx) return;

    if(graficoEtiquetas)
        graficoEtiquetas.destroy();

    graficoEtiquetas = new Chart(ctx,{

        type:"doughnut",

        data:{

            labels:[
                "Aguardando",
                "Em Montagem",
                "Montadas",
                "Não Checada",
                "Cancelada"
            ],

            datasets:[{

                data:[

                    resultado.filter(x=>(x.SituacaoEtiqueta || "").includes("Aguardando")).length,
                    resultado.filter(x=>(x.StatusMaster || "").includes("Em Montagem")).length,
                    resultado.filter(x=>(x.SituacaoEtiqueta || "").includes("Montada")).length,
                    resultado.filter(x=>(x.SituacaoEtiqueta || "").includes("Não Checada")).length,
                    resultado.filter(x=>(x.SituacaoEtiqueta || "").includes("Cancelada")).length

                ],

                backgroundColor:[
                    "#eab308",
                    "#3b82f6",
                    "#22c55e",
                    "#64748b",
                    "#ef4444"
                ]
            }]
        }
    });

}
