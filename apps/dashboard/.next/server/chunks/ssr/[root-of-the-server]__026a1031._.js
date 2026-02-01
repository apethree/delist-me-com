module.exports=[93695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},68686,a=>{a.n(a.i(67892))},81784,a=>{a.n(a.i(32612))},2914,a=>{a.n(a.i(56489))},18481,a=>{a.n(a.i(20083))},81270,a=>{a.n(a.i(4540))},23524,a=>{a.n(a.i(36416))},37509,a=>{"use strict";a.s(["DashboardClient",()=>b]);let b=(0,a.i(9806).registerClientReference)(function(){throw Error("Attempted to call DashboardClient() from the server but DashboardClient is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/apps/dashboard/components/dashboard-client.tsx <module evaluation>","DashboardClient")},82561,a=>{"use strict";a.s(["DashboardClient",()=>b]);let b=(0,a.i(9806).registerClientReference)(function(){throw Error("Attempted to call DashboardClient() from the server but DashboardClient is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/apps/dashboard/components/dashboard-client.tsx","DashboardClient")},86629,a=>{"use strict";a.i(37509);var b=a.i(82561);a.n(b)},93084,a=>{"use strict";var b=a.i(93318);a.i(52466);var c=a.i(24408),d=a.i(41780),e=a.i(86629);async function f(){let a=await (0,d.createClient)(),{data:{user:f},error:g}=await a.auth.getUser();(g||!f)&&(0,c.redirect)("/");let{data:h}=await a.from("profiles").select("*").eq("id",f.id).single();h?.onboarding_complete||(0,c.redirect)("/dashboard/authorize");let{data:i}=await a.from("removal_requests").select(`
      id,
      status,
      created_at,
      updated_at,
      data_brokers (
        id,
        name,
        domain,
        category,
        risk_level
      )
    `).eq("user_id",f.id).order("created_at",{ascending:!1});return(0,b.jsx)(e.DashboardClient,{profile:h,requests:i||[]})}a.s(["default",()=>f])}];

//# sourceMappingURL=%5Broot-of-the-server%5D__026a1031._.js.map