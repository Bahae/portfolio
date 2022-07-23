class Pricing{

    constructor(plans){
        this.plans = plans
    }

    generatePricingTable(){
        var table = '<table class="w-full">'

        table += '<thead><tr><td colspan="3"></td>'
        this.plans.forEach((plan)=>{
            table += `
                <th class="px-4 py-4 border">
                    `+plan.title+`
                </th>
            `
        })
        table += '</thead></tr>'

        this.priceslist.forEach((e)=>
            table += this.generateTbody(e)
        );
        
        table += '<tfoot><tr class="border-t"><td colspan="3"></td>'

        this.plans.forEach((plan)=>{
            table +=`
                <th class="border-l px-6 border-r border-b py-4">
                    <small class="text-xs font-medium text-gray-400">$</small>
                    <span class="text-2xl">
                        `+this.calculateTotalPrice(plan)+`
                    </span>
                </th>
            `
        })

        table += '</tr></tfoot>'
        return table += '</table>'
    }

    generateTbody(element){        
        var tbody = ''
        tbody = `
            <tbody>
                <tr class="border text-left">
                    <th class="py-2 text-center border-l" colspan="3">
                        `+element.id+`
                    </th>
                   <td colspan="`+this.plans.length+`"></td>
                </tr>
        `

        element.features.forEach((feature)=>{
            var unit = ''

            if(feature.unit != null){
                unit += '/ '+feature.unit
                if(feature.qte > 1){
                    unit += '×'+String(feature.qte).padStart(2, '0')
                }
            }

            tbody += `
                <tr class="hover:bg-gray-50 border-r">
                    <td class="border-l">&emsp; &emsp; </td>
                    <td class="px-4 font-medium text-sm py-1">
                        `+feature.title+`
                    </td>
                    <th class="px-4">`+this.generateTag(feature)+`</th>
                    <!--<td class="text-center px-4 py-1">
                        <h2 class="leading-none font-bold">
                            <small class="text-xs font-medium text-gray-400">$</small>
                            `+feature.price+`
                            <small class="text-xs text-gray-400 leading-none">
                                `+ unit +`
                            </small>
                        </h2>
                    </td>-->
                    `+this.generateTbodyPlan(element.id+'.'+feature.id,feature)+`
                </tr>
            `
        })
        return tbody += '</tbody>'
        
    }

    generateTbodyPlan(id,feature){

        var plantd = ''
        this.plans.forEach((plan)=>{
            if(plan.features[id] !== undefined){
                plantd += this.generatePlanValue(feature,plan.features[id],true)
            }else{
                plantd += this.generatePlanValue(feature,null,false)
            }
        })

        return plantd
    }


    generateTag(feature){
        var tag = ''
        
        feature.tags.forEach((t)=>{
            tag += '<span class="text-xs text-center font-medium px-2 bg-black text-white">'
            tag += t
            tag += '</span>'
        })

        return tag
    }

    generatePlanValue(feature,value, isExist){
        var td = '<td class="border-l px-4 text-center">'
        if(isExist){
            switch(feature.type){
                case "int":
                    if(value == 999) td += '<span class="text-xs font-bold text-black">Unlimited</span>'
                    else td += `
                        <span class="font-bold">
                            `+String(value).padStart(2, '0')+`
                        </span>
                    `

                ;break
                case "boolean": 
                    
                    if(value){
                        td += `
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 m-auto text-black" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                        </svg>
                        `
                    }else{
                        td += `
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 m-auto text-red-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                        </svg>
                        `
                    }
                   
                ;break
                default: td += value ;break
            }
        }else(
            td += '-'
        )
        return td +='</td>'
    }

    calculateTotalPrice(plan){
        var total = 0
        this.priceslist.forEach((e)=>{
            e.features.forEach((f)=>{
                if(plan.features[e.id+'.'+f.id] !== undefined){

                    if(f.type == "int"){
                        if(plan.features[e.id+'.'+f.id] == 999)
                            total += 20 * f.price
                        else
                            total += (plan.features[e.id+'.'+f.id]/f.qte) * f.price
                    }

                    if(f.type == "boolean"){
                        total += f.price
                    }
 
                }
            })
        })
        return total
    }


    priceslist = [
        {
            "id":"scanner",
            "features":[
                {
                    "id":"rtd",
                    "title":"Realtime Detection",
                    "price": 40,
                    "qte":1,
                    "type":"boolean",
                    "tags":[],
                    "unit":null
                },{
                    "id":"cc",
                    "title":"Custom Configuration",
                    "price": 10,
                    "qte":1,
                    "type":"boolean",
                    "tags":['New'],
                    "unit":null
                },{
                    "id":"mms",
                    "title":"Modem Models Suupport",
                    "price": 5,
                    "qte":1,
                    "type":"checkbox",
                    "tags":[],
                    "unit":"modem"
                },{
                    "id":"ml",
                    "title":"Max Modems connected",
                    "price": 5,
                    "qte":1,
                    "type":"int",
                    "tags":[],
                    "unit":"modem"
                }
            ]
        },{
            "id":"worker",
            "features":[
                {
                    "id":"wl",
                    "title":"Workers Limit",
                    "price": 15,
                    "qte":1,
                    "type":"int",
                    "tags":[],
                    "unit":"worker"
                }
            ]
        },{
            "id":"queue",
            "features":[
                {
                    "id":"p",
                    "title":"Task Prioritising",
                    "price": 12,
                    "qte":1,
                    "type":"boolean",
                    "tags":[],
                    "unit":null
                },{
                    "id":"ts",
                    "title":"Task Schedule",
                    "price": 15,
                    "qte":1,
                    "type":"boolean",
                    "tags":['Soon'],
                    "unit":null
                }
            ]

        },{
            "id":"security",
            "features":[
                {
                    "id":"encryption",
                    "title":"Request Encryption",
                    "price": 31,
                    "qte":1,
                    "type":"boolean",
                    "tags":[],
                    "unit":null
                },{
                    "id":"authentication",
                    "title":"Authentications",
                    "price": 31,
                    "qte":1,
                    "type":"boolean",
                    "tags":[],
                    "unit":null
                },{
                    "id":"authlimit",
                    "title":"Authentication Limit",
                    "price": 31,
                    "qte":1,
                    "type":"int",
                    "tags":[],
                    "unit":null
                }
            ]
        },{
            "id":"access",
            "features":[
                {
                    "id":"private",
                    "title":"Private",
                    "price": 18,
                    "qte":1,
                    "type":"boolean",
                    "tags":[],
                    "unit":null
                },{
                    "id":"local",
                    "title":"Local Network",
                    "price": 31,
                    "qte":1,
                    "type":"boolean",
                    "tags":[],
                    "unit":null
                },{
                    "id":"internet",
                    "title":"Internet",
                    "price": 45,
                    "qte":1,
                    "type":"boolean",
                    "tags":[],
                    "unit":null
                }
            ]
        },{
            "id":"job",
            "features":[
                {
                    "id":"cj",
                    "title":"Custom Jobs",
                    "price": 18,
                    "qte":1,
                    "type":"boolean",
                    "tags":[],
                    "unit":null
                },{
                    "id":"jl",
                    "title":"Jobs Limit",
                    "price": 5,
                    "qte":1,
                    "type":"int",
                    "tags":[],
                    "unit":"job"
                },{
                    "id":"ujs",
                    "title":"USSD Job Steps",
                    "price": 43,
                    "qte":1,
                    "type":"boolean",
                    "tags":[],
                    "unit":null
                },{
                    "id":"sjs",
                    "title":"SMS Job Steps",
                    "price": 38,
                    "qte":1,
                    "type":"boolean",
                    "tags":['Soon'],
                    "unit":null
                },{
                    "id":"ajs",
                    "title":"AT-Command Job Steps",
                    "price": 31,
                    "qte":1,
                    "type":"boolean",
                    "tags":['Soon'],
                    "unit":null
                },{
                    "id":"jsl",
                    "title":"Job Steps Limit",
                    "price": 6,
                    "qte":1,
                    "type":"int",
                    "tags":[],
                    "unit":null
                },{
                    "id":"mjs",
                    "title":"Mixed job steps types",
                    "price": 31,
                    "qte":1,
                    "type":"boolean",
                    "tags":['Soon'],
                    "unit":null
                }
            ]
        }
    ]
}

var plan1 = {
    "title":"Small",
    "price":0,
    "features":{
        "scanner.rtd":true,
        "scanner.cc":false,
        "scanner.mms":1,
        "scanner.ml":4,

        "worker.wl":3,
        "queue.p":false,
        
        "security.encryption":false,
        "security.authentication":false,
        "security.authlimit":1,
        
        "access.private":true,
        "access.local":false,
        "access.internet":false,

        "job.cj":false,
        "job.jl":8,
        "job.ujs":true,
        "job.sjs":false,
        "job.ajs":false,
        "job.jsl":3,
        "job.mjs":false,
    }
}
var plan2 = {
    "title":"Medium",
    "price":0,
    "features":{
        "scanner.rtd":true,
        "scanner.cc":true,
        "scanner.mms":1,
        "scanner.ml":7,

        "worker.wl":7,
        "queue.p":true,
        
        "security.encryption":true,
        "security.authentication":true,
        "security.authlimit":2,
        
        "access.private":true,
        "access.local":true,
        "access.internet":false,

        "job.cj":true,
        "job.jl":20,
        "job.ujs":true,
        "job.sjs":true,
        "job.ajs":false,
        "job.jsl":6,
        "job.mjs":false,
    }
}

var plan3 = {
    "title":"Large",
    "price":0,
    "features":{
        "scanner.rtd":true,
        "scanner.cc":true,
        "scanner.mms":1,
        "scanner.ml":999,

        "worker.wl":999,
        "queue.p":true,
        
        "security.encryption":true,
        "security.authentication":true,
        "security.authlimit":999,
        
        "access.private":true,
        "access.local":true,
        "access.internet":true,

        "job.cj":true,
        "job.jl":999,
        "job.ujs":true,
        "job.sjs":true,
        "job.ajs":true,
        "job.jsl":999,
        "job.mjs":true,
    }
}