if(!self.define){const o=o=>{"require"!==o&&(o+=".js");let e=Promise.resolve();return a[o]||(e=new Promise((async e=>{if("document"in self){const a=document.createElement("script");a.src=o,document.head.appendChild(a),a.onload=e}else importScripts(o),e()}))),e.then((()=>{if(!a[o])throw new Error(`Module ${o} didn’t register its module`);return a[o]}))},e=(e,a)=>{Promise.all(e.map(o)).then((o=>a(1===o.length?o[0]:o)))},a={require:Promise.resolve(e)};self.define=(e,n,i)=>{a[e]||(a[e]=Promise.resolve().then((()=>{let a={};const s={uri:location.origin+e.slice(1)};return Promise.all(n.map((e=>{switch(e){case"exports":return a;case"module":return s;default:return o(e)}}))).then((o=>{const e=i(...o);return a.default||(a.default=e),a}))})))}}define("./service-worker.js",["./workbox-3b5792f5"],(function(o){"use strict";self.skipWaiting(),o.clientsClaim(),o.precacheAndRoute([{url:"17edf0562df16666a1c5.webp",revision:null},{url:"8c5a751a820e9d7e1912.ttf",revision:null},{url:"a1ef38c1fc531716c45e.svg",revision:null},{url:"a6f39d75f289fa4ac279.eot?",revision:null},{url:"audio/loops/139749__hybu__water-dripping-2.mp3",revision:"3bf3dcaecb441f559c9df8b76bf7d863"},{url:"audio/loops/184453__yuval__bathroom-tap-dripping.mp3",revision:"3f1a0bdbcc549aa12090b3cb4f65ab8b"},{url:"audio/loops/abashiri-aircon.mp3",revision:"7320fe3314dda3794bca87928d3f0c64"},{url:"audio/loops/basin-loop.mp3",revision:"a2de0a19965df09a952350c586e222ee"},{url:"audio/loops/cistern-and-hand-dry.mp3",revision:"fe8aa41afd13b3c376144af9b505893b"},{url:"audio/loops/cistern-jangle.mp3",revision:"f949306c92430739fff27bab1f62e758"},{url:"audio/loops/cistern-refill-loop.mp3",revision:"84df1ae46d10ada743777089a989efb5"},{url:"audio/loops/cistern-refill-loop2.mp3",revision:"46c418fcd86001128fed72315411b94c"},{url:"audio/loops/cistern-refill-loop3.mp3",revision:"23cd136cfca71a14c281910d952f1fb5"},{url:"audio/loops/cistern-refill4.mp3",revision:"6c2f14e9f5a2f2bb7367cad06aa85837"},{url:"audio/loops/cistern-releasing.mp3",revision:"6b4df24af4debd7b6769e02c5c3bf140"},{url:"audio/loops/drip-hum-sub2.mp3",revision:"4039c3c216fbb3bbc83907a6994ddd0d"},{url:"audio/loops/drip-no-hum-full2.mp3",revision:"0056aba30b23f953f3cbf0d6e8d3128a"},{url:"audio/loops/handwash.mp3",revision:"d7a9dbc9b9803d75dac4cef2f4e80575"},{url:"audio/loops/long-dribble-resampled.mp3",revision:"65ab947288eebf5fbd3d0e27033bbd47"},{url:"audio/loops/northland-fanloop.mp3",revision:"00428a0affc6323f1de90a36a1ca3e8d"},{url:"audio/loops/refill-loop.mp3",revision:"5ef9d4d84d5229a6d85df14f5efe1c34"},{url:"audio/loops/refill-tickley-burble.mp3",revision:"8933b088e929218efddc278885360d2d"},{url:"audio/loops/santorini_cistern2.mp3",revision:"bbe603d52d63574c0b03c12f4b84929e"},{url:"audio/manifest.json",revision:"f845d7b439e3692dcb4b01b071633409"},{url:"audio/oneshot/concrete/58201__the-bizniss__bathroom-recordings-gurgle.mp3",revision:"40c7a7aad88773bca4107127b142f15c"},{url:"audio/oneshot/concrete/58201__the-bizniss__bathroom-recordings-gurgle2.mp3",revision:"825f290a92da115d754a4feb5bcd4690"},{url:"audio/oneshot/concrete/71218__adegenerate__24-flushing-toilet-flush-gurgle.mp3",revision:"34e08269673f4175818d2171231a431b"},{url:"audio/oneshot/concrete/71218__adegenerate__24-flushing-toilet-gurgle.mp3",revision:"2f3ffa741957821a4912920acae357f1"},{url:"audio/oneshot/concrete/abrupt.mp3",revision:"47dd6a93f1e2c8da1fc3304e6ddfd4fa"},{url:"audio/oneshot/concrete/another-death-rattle.mp3",revision:"2173d18091b96219e326faa7f195e706"},{url:"audio/oneshot/concrete/drain-expiry.mp3",revision:"764ea2efbbba7d162c0bbce378332109"},{url:"audio/oneshot/concrete/flush-lever-flick.mp3",revision:"a49827d2d9f6874109f039e47bafc0f3"},{url:"audio/oneshot/concrete/flush-short2.mp3",revision:"3e936237eb6181a74b8bf4873a33c176"},{url:"audio/oneshot/concrete/flush.mp3",revision:"0f1cc52bee5cb67b505ed80d56c7749b"},{url:"audio/oneshot/concrete/foot-on-grill3.mp3",revision:"67fb2149696bf66056b4a66278439156"},{url:"audio/oneshot/concrete/handwash.mp3",revision:"d86ab347cef962d9e06bc4eb46c231d1"},{url:"audio/oneshot/concrete/switch-lights-loop.mp3",revision:"f3af48fd6389b99a4c67aa0869ec1cdb"},{url:"audio/oneshot/concrete/urinal-cistern-release1.mp3",revision:"f2677f31129b199485bad2561cdfd598"},{url:"audio/oneshot/concrete/urinal-cistern-release2.mp3",revision:"2859534a6dede265547c162162b2dfaa"},{url:"audio/oneshot/instrumental/bassoon/1987_bassoon_042_3_6_1.mp3.mp3",revision:"e388548f32fa8b53b23c7cd4de9edce3"},{url:"audio/oneshot/instrumental/bassoon/1989_bassoon_043_1_6_1.mp3.mp3",revision:"82ba67eb98c134fc58581ef49e09d847"},{url:"audio/oneshot/instrumental/bassoon/2028_bassoon_053_4_6_1.mp3.mp3",revision:"ba790cfc756d2804016554fd44db87dc"},{url:"audio/oneshot/instrumental/bassoon/2073_bassoon_065_2_6_1.mp3.mp3",revision:"64d8c1f5c1295f50ea63f9b5f657c01b"},{url:"audio/oneshot/instrumental/bassoon/2082_bassoon_067_4_6_1.mp3.mp3",revision:"49916c3a183e4fe602c7205dafd4a566"},{url:"audio/oneshot/instrumental/bassoon/2086_bassoon_068_4_6_1.mp3.mp3",revision:"93f2d5829d7ee00ffdc48ffce81a25b3"},{url:"audio/oneshot/instrumental/bassoon/2187_bassoon_043_2_7_1.mp3.mp3",revision:"e06c15fbb9800c8e97a333f800e28ffd"},{url:"audio/oneshot/instrumental/bassoon/2212_bassoon_051_4_7_1.mp3.mp3",revision:"af16c4a70fee6660bd8222766065b25d"},{url:"audio/oneshot/instrumental/bassoon/2253_bassoon_055_3_7_1.mp3.mp3",revision:"35cea680074bae81eeb43f5eb30f0a61"},{url:"audio/oneshot/instrumental/bassoon/2318_bassoon_073_3_7_1.mp3.mp3",revision:"edefb4b0ceb540f35e84ee935059d70a"},{url:"audio/oneshot/instrumental/bassoon/2385_bassoon_077_2_7_1.mp3.mp3",revision:"8bfb1613dd94d072467c22e9df6d1b81"},{url:"audio/oneshot/instrumental/bassoon/2399_bassoon_034_2_9_1.mp3.mp3",revision:"0946a030674bfacbea3df1f8a7523426"},{url:"audio/oneshot/instrumental/bassoon/2588_bassoon_042_1_10_1.mp3.mp3",revision:"eceed4d1fbcd500b500b1a81dce78692"},{url:"audio/oneshot/instrumental/bassoon/2679_bassoon_068_2_10_1.mp3.mp3",revision:"7b797babbc65a7af1046cf3f8e9115bf"},{url:"audio/oneshot/instrumental/bassoon/2787_bassoon_055_6_3_1.mp3.mp3",revision:"16e36e12dcab0f09df4f1d2dc402c057"},{url:"audio/oneshot/instrumental/contrabassoon/3901_contrabassoon_055_2_6_1.mp3.mp3",revision:"21deb7aa8b48b7faba1b5add0e436923"},{url:"audio/oneshot/instrumental/contrabassoon/4097_contrabassoon_024_2_9_1.mp3.mp3",revision:"003040f2940ae16da4c56d449b672188"},{url:"audio/oneshot/instrumental/contrabassoon/4475_contrabassoon_031_6_3_1.mp3.mp3",revision:"52e20903f3f15fbdcd6ebb8bc3cff40f"},{url:"audio/oneshot/instrumental/contrabassoon/4493_contrabassoon_041_5_9_16.mp3.mp3",revision:"4abab6d0f2f4fd7fcc10a49672de6bcc"},{url:"audio/oneshot/instrumental/contrabassoon/4496_contrabassoon_047_5_9_16.mp3.mp3",revision:"256c4e3419c056d470482f96fceda38f"},{url:"audio/oneshot/instrumental/contrabassoon/4636_contrabassoon_055_2_6_1.mp3.mp3",revision:"21deb7aa8b48b7faba1b5add0e436923"},{url:"audio/oneshot/instrumental/saxophone/1026_saxophone_055_4_5_1.mp3.mp3",revision:"4a7451072c1912c2466f998e12028f1d"},{url:"audio/oneshot/instrumental/saxophone/1029_saxophone_057_1_5_1.mp3.mp3",revision:"33c0379f29e10b6f5756ff138879ed0b"},{url:"audio/oneshot/instrumental/saxophone/1037_saxophone_058_1_5_1.mp3.mp3",revision:"925400b70dc7b75d51ef72b0a506cf6e"},{url:"audio/oneshot/instrumental/saxophone/1054_saxophone_063_2_5_1.mp3.mp3",revision:"7f76891dda028722e8061d698d570050"},{url:"audio/oneshot/instrumental/saxophone/1069_saxophone_068_3_5_1.mp3.mp3",revision:"9df36206844f8247f2f773ff7b6a597d"},{url:"audio/oneshot/instrumental/saxophone/1318_saxophone_059_1_5_1.mp3.mp3",revision:"3fef3fb764ed9235bb5886d93470be98"},{url:"audio/oneshot/instrumental/saxophone/1390_saxophone_057_2_9_1.mp3.mp3",revision:"feabe27de82704c5f52e8997c16d4712"},{url:"audio/oneshot/instrumental/saxophone/1494_saxophone_053_4_10_1.mp3.mp3",revision:"2fcc95a83f7e3da6cb92498cc37ba3cd"},{url:"audio/oneshot/instrumental/saxophone/1502_saxophone_055_4_10_1.mp3.mp3",revision:"cfa0a0b647905281dd70d412bb3aa770"},{url:"audio/oneshot/instrumental/saxophone/1811_saxophone_067_3_6_1.mp3.mp3",revision:"93235b60f04947b8eff701b64853067c"},{url:"audio/oneshot/instrumental/trumpet/1016_trumpet_059_4_5_1.mp3.mp3",revision:"dab13c52061f0caa0527d7ef64813b2b"},{url:"audio/oneshot/instrumental/trumpet/1094_trumpet_079_2_5_1.mp3.mp3",revision:"9a63975b3106dd445daee517aba73d1e"},{url:"audio/oneshot/instrumental/trumpet/1142_trumpet_064_3_9_1.mp3.mp3",revision:"c5441c7e9eebc3b46da4a7e4974dd1f5"},{url:"audio/oneshot/instrumental/trumpet/1144_trumpet_065_2_9_1.mp3.mp3",revision:"23a4313adcd76123bd0fe3926a3c1524"},{url:"audio/oneshot/instrumental/trumpet/1147_trumpet_067_2_9_1.mp3.mp3",revision:"26f06ccebaa508db6a3aca35b7af2c3f"},{url:"audio/oneshot/instrumental/trumpet/1148_trumpet_067_3_9_1.mp3.mp3",revision:"32f1792668564e7b06f989b5cf81a997"},{url:"audio/oneshot/instrumental/trumpet/1370_trumpet_086_7_9_15.mp3.mp3",revision:"00fda52ad6556b2b0b52c45854680aa4"},{url:"audio/oneshot/instrumental/trumpet/978_trumpet_044_5_5_1.mp3.mp3",revision:"e0208556c60c4f83932c1bd6eef2a075"},{url:"audio/oneshot/instrumental/tuba/2466_tuba_032_1_5_1.mp3.mp3",revision:"6323f0b43804e10e307968133b059bea"},{url:"audio/oneshot/instrumental/tuba/2513_tuba_043_4_5_1.mp3-old1.mp3",revision:"c9921399ead10ae6bf89f0892731be92"},{url:"audio/oneshot/instrumental/tuba/2513_tuba_043_4_5_1.mp3.mp3",revision:"cff210e7f15310bbb5575df8b5dc9b66"},{url:"audio/oneshot/instrumental/tuba/2632_tuba_031_4_6_1.mp3.mp3",revision:"4a68f77d946f5c88076dd23d7c1aac7c"},{url:"audio/oneshot/instrumental/tuba/2748_tuba_023_5_7_1.mp3.mp3",revision:"1509c591836017f21160929fb8a3142f"},{url:"audio/oneshot/instrumental/tuba/2879_tuba_022_5_8_1.mp3.mp3",revision:"45b089aa2228a820e7bbcccdcd32d5be"},{url:"audio/oneshot/instrumental/tuba/2986_tuba_025_5_9_1.mp3.mp3",revision:"6873ce6e43a5a7cb49c510927072aad5"},{url:"audio/oneshot/instrumental/tuba/3062_tuba_031_2_10_1.mp3.mp3",revision:"151ecdbb6668177370bf8df84dcddccc"},{url:"audio/oneshot/instrumental/tuba/3103_tuba_053_2_10_1.mp3.mp3",revision:"3a50769d94d77e1794d1a6090eec5096"},{url:"audio/oneshot/instrumental/tuba/3127_tuba_045_5_8_11.mp3.mp3",revision:"52563b07315ccee75b1228b85574f545"},{url:"audio/oneshot/instrumental/tuba/3131_tuba_057_5_8_11.mp3.mp3",revision:"ee62bd7ea92777c6701b3e4550dd850e"},{url:"audio/oneshot/instrumental/tuba/3171_tuba_039_3_9_16.mp3.mp3",revision:"9106c833b0529e29237ad4930e80d652"},{url:"audio/oneshot/instrumental/tuba/3228_tuba_047_3_10_23.mp3.mp3",revision:"16f7d5f54e617d192c69a4dce66cb180"},{url:"c83c84281ef92b570254.woff",revision:null},{url:"favicon.ico",revision:"56f93499dae6d39d5dc58b1fc58de690"},{url:"icons/android-chrome-192x192.png",revision:"5f60c07742be7d69448a118be1a2a6b8"},{url:"icons/android-chrome-512x512.png",revision:"daaacfb36313b5b80fc1aef28ac6ddf2"},{url:"icons/apple-touch-icon.png",revision:"30064b82b9270ddf6e60c6372c5ee998"},{url:"icons/favicon-16x16.png",revision:"4cc9228fb7cbd0fd6ae001ced04c2cde"},{url:"icons/favicon-32x32.png",revision:"c97dad84db1e6771397866029935936f"},{url:"icons/favicon.ico",revision:"56f93499dae6d39d5dc58b1fc58de690"},{url:"index.html",revision:"8d0af4ff8631a45d012f44abe918d916"},{url:"main.7a137e9e33517f99d45a.css",revision:null},{url:"main.87356c06bc8f2ff593b9.js",revision:null},{url:"main.87356c06bc8f2ff593b9.js.LICENSE.txt",revision:"0520f9e6c3cd10b2b74a6406be3a5d9b"}],{})}));
//# sourceMappingURL=service-worker.js.map
