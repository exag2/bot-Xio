/*Flujo con sin menu*/
const { 
    createBot,
    createProvider,
    createFlow, 
    addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowSecundario2 = addKeyword(['2', 'siguiente']).addAnswer(['📄 Aquí tenemos el flujo secundario'])


const flowCorreo2 = addKeyword(['5','me pueden contactar', 'Contactame'])
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
[flowSecundario2])


const flowDocs2 = addKeyword(['4','doc', 'documentacion', 'documentación']).addAnswer(
    [
        '📄 Aquí encontras las documentación recuerda que puedes mejorarla',
        'https://bot-whatsapp.netlify.app/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario2]
)

const flowTuto2 = addKeyword(['3','tutorial', 'tuto']).addAnswer(
    [
        '🙌 Aquí encontras un ejemplo rapido',
        'https://bot-whatsapp.netlify.app/docs/example/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario2]
)

const flowGracias2 = addKeyword(['2','gracias', 'grac']).addAnswer(
    [
        '🚀 Puedes aportar tu granito de arena a este proyecto',
        '[*opencollective*] https://opencollective.com/bot-whatsapp',
        '[*buymeacoffee*] https://www.buymeacoffee.com/leifermendez',
        '[*patreon*] https://www.patreon.com/leifermendez',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario2]
)

const flowDiscord2 = addKeyword(['1','discord']).addAnswer(
    ['🤪 Únete al discord', 'https://link.codigoencasa.com/DISCORD', '\n*2* Para siguiente paso.'],
    null,
    null,
    [flowSecundario2, flowGracias2, flowTuto2, flowDocs2, flowCorreo2, flowSecundario2]
)

const flowPrincipal2 = addKeyword(['hola', 'buenas'])
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
        ])
    .addAnswer(
        [
            'Digita el numero que contiene la opcion que necesitas',
            '👉 1 - Discord',
            '👉 2 - Agradecimientos',
            '👉 3 - Tutorial',
            '👉 4 - Documentos',
            '👉 5 - enviame un correo',

        ],
        null,
        null,
        [flowDocs2, flowGracias2, flowTuto2, flowDiscord2, flowCorreo2]
    )
    

/*https://miro.medium.com/max/4928/1*-QTg-_71YF0SVshMEaKZ_g.png*/
/*https://i.imgur.com/0HpzsEm.png*/
/*
const flowPrincipal2 = addKeyword('Imagen')
.addAnswer('Te envio una imagen',{media:'https://i.imgur.com/0HpzsEm.png'},
null,
null,
[flowPrimario])*/

/*----------------------------------------------------------*/
/*const flowPrincipal2 = addKeyword('pagar')
    .addAnswer('🙌 Con gusto te brindo un link de pago', null, (ctx,{flowDynamic}) => {
        const generarLink = () => 'https://milinkpage.com/pagar'
        await.flowDynamic([{body:'Te envio el link generado por stripe:${generarLink()}}])
    })*/
    
    /*//solo esta funcionando con meta y twilio
    const flowPrincipal2 = addKeyword('botones')
    .addAnswer('🙌 selecciona los botones',{
    buttons: S[
    {
        body:'imagen'
    },
    {
        body:'Video'
    },
    {
        body:'informacion'
    }
        ]
    })*/
/*-------------------------------------------------*/

const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer(['📄 Aquí tenemos el flujo secundario'])


const flowCorreo = addKeyword(['5','me pueden contactar', 'Contactame'])
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


const flowDocs = addKeyword(['4','doc', 'documentacion', 'documentación']).addAnswer(
    [
        '📄 Aquí encontras las documentación recuerda que puedes mejorarla',
        'https://bot-whatsapp.netlify.app/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowTuto = addKeyword(['3','tutorial', 'tuto']).addAnswer(
    [
        '🙌 Aquí encontras un ejemplo rapido',
        'https://bot-whatsapp.netlify.app/docs/example/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowGracias = addKeyword(['2','gracias', 'grac']).addAnswer(
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

const flowDiscord = addKeyword(['1','discord']).addAnswer(
    ['🤪 Únete al discord', 'https://link.codigoencasa.com/DISCORD', '\n*2* Para siguiente paso.'],
    null,
    null,
    [flowSecundario, flowGracias, flowTuto, flowDocs, flowCorreo, flowSecundario]
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
        ])
    .addAnswer(
        [
            'Digita el numero que contiene la opcion que necesitas',
            '👉 1 - Discord',
            '👉 2 - Agradecimientos',
            '👉 3 - Tutorial',
            '👉 4 - Documentos',
            '👉 5 - enviame un correo',

        ],
        null,
        null,
        [flowDocs, flowGracias, flowTuto, flowDiscord, flowCorreo]
    )
    

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal, flowPrincipal2])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
