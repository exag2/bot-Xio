/*Flujo sin menu*/
const { 
    createBot,
    createProvider,
    createFlow, 
    addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer(['📄 Aquí tenemos el flujo secundario'])

const flowCorreo = addKeyword(['me pueden contactar', 'Contactame'])
.addAnswer('Enviame tu correo',
{capture:true},(ctx, {fallBack}) => {
   
    if(!ctx.body.includes('@')){
        return fallBack()   
     }
    console.log('mensaje entrante:', ctx.body)
})

.addAnswer('En los siguientes minutos te enviaremos un Email',
null,
null,
[flowSecundario])


const flowDocs = addKeyword(['doc', 'documentacion', 'documentación']).addAnswer(
    [
        '📄 Aquí encontras las documentación recuerda que puedes mejorarla',
        'https://bot-whatsapp.netlify.app/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowTuto = addKeyword(['tutorial', 'tuto']).addAnswer(
    [
        '🙌 Aquí encontras un ejemplo rapido',
        'https://bot-whatsapp.netlify.app/docs/example/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowGracias = addKeyword(['gracias', 'grac']).addAnswer(
    [
        '🚀 Puedes aportar tu granito de arena a este proyecto',
        '[*opencollective*] https://opencollective.com/bot-whatsapp',
        '[*buymeacoffee*] https://www.buymeacoffee.com/leifermendez',
        '[*patreon*] https://www.patreon.com/leifermendez',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowDiscord = addKeyword(['discord']).addAnswer(
    ['🤪 Únete al discord', 'https://link.codigoencasa.com/DISCORD', '\n*2* Para siguiente paso.'],
    null,
    null,
    [flowSecundario, flowDocs]
)

const flowPrincipal = addKeyword(['hola', 'buenas'])
    .addAnswer('🙌 Hola bienvenido al curso de IA ❤💻😎⌨')
    .addAnswer('¿Como podemos ayudarte?', {capture:true}, (ctx)=>{
        console.log('Mensaje entrante:', ctx.body)
    })
    .addAnswer(
        [
            'te comparto los siguientes links de interes sobre el curso',
            '👉 Sitio web del curso https://evacurc.uls.edu.sv/course/view.php?id=331#section-10',
            '👉 *gracias*  para ver la lista de videos',
            '👉 *discord* unirte al discord',
        ],
        null,
        null,
        [flowDocs, flowGracias, flowTuto, flowDiscord, flowCorreo]
    )
    

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
