const $ = selector => document.querySelector(selector); 
var settings = {
    maskBG: "images/mask/triad.png",
    maskScale: 4,
    maskOpacity: 0.3,
    scanlines: false,
    scanlineOpacity: 1,
    flicker: false,
    flickerOpacity: 0.1,
    flickerSpeed: 0.01,
    noise: false,
    noiseOpacity: 0.025,
    dark: true,
    textBlur: false,
    cursor: false}

function updateStyles(settings) {
    const screenDots = $("#overlay-dots");
    const screenNoise = $("#overlay-noise");
    const screenBlack = $("#overlay-black");
    const screenLines = $("#overlay-lines");
    
    if(settings.dark) {
	document.body.classList.add('dark');
	$("#controls").classList.add('dark');
    }
 
    else {
	document.body.classList.remove('dark');
	$("#controls").classList.remove('dark');
    }
    if(settings.textBlur) {
	document.body.style.color = "transparent";
	document.body.style.textShadow = `${settings.dark ? "white" : "black"} 0px 0px 1px`;
    }
    else {
	document.body.style.color = "";
	document.body.style.textShadow = "";
    }
      
    screenLines.style.display = settings.scanlines ? "block" : "none";
    screenLines.style.opacity = settings.scanlineOpacity;
    
    screenDots.style.opacity = settings.maskOpacity;
    screenDots.style.background = `url("${settings.maskBG}")`;
    screenDots.style.backgroundSize = settings.maskScale+"px";
    
    screenBlack.style.display = settings.flicker ? "block" : "none";
    screenBlack.style.animation = `${settings.flickerSpeed}s infinite alternate flicker`;
    
    screenNoise.style.display = settings.noise ? "block" : "none";
    screenNoise.style.opacity = settings.noiseOpacity;
}

document.addEventListener("DOMContentLoaded", function () {
    const controls = $("#controls");
    const maskSelect = $("#overlay-masktype");
    const opSlider = $("#overlay-opacity");
    const scaleSlider = $("#overlay-dotscale");
    const scanSlider = $("#scanline-opacity");
    const scanToggle = $("#scanline-toggle");
    const noiseSlider = $("#overlay-noise-a");
    const noiseToggle = $("#noise-toggle");
    const flickerSlider = $("#flicker-speed");
    const flickerToggle = $("#flicker-toggle");
    const darkToggle = $("#dark-toggle");
    const blurToggle = $("#blur-toggle")
    
    maskSelect.addEventListener("input", () => {
	settings.maskBG = `images/mask/${maskSelect.value}`;
    });
    opSlider.addEventListener("input", () => {
	const opacityValue = opSlider.value / 100;
	const opacityLabel = $("#opacity-val")
	settings.maskOpacity = opacityValue;
	opacityLabel.innerText = opacityValue;
    });
    scanSlider.addEventListener("input", () => {
	const sOpValue = scanSlider.value / 100;
	const opacityLabel = $("#scanop-val")
	settings.scanlineOpacity = sOpValue;
	opacityLabel.innerText = sOpValue;
    });
    scaleSlider.addEventListener("input", () => {
	const scaleValue = scaleSlider.value;
	const scaleLabel = $("#scale-val");
	settings.maskScale = scaleValue / window.devicePixelRatio;
	scaleLabel.innerText = scaleValue + "px";
    });
    noiseSlider.addEventListener("input", () => {
	const noiseLabel = $("#noise-val");
	noiseLabel.innerText = noiseSlider.value / 1000;
	settings.noiseOpacity = noiseSlider.value / 1000;
    });
    flickerSlider.addEventListener("input", () => {
	const flickerLabel = $("#flicker-val");
	const flickerValue = flickerSlider.value / 100;
	flickerLabel.innerText = flickerValue;
	settings.flickerSpeed = flickerValue;
    });
    
    scanToggle.addEventListener("input", () => { settings.scanlines = scanToggle.checked });
    noiseToggle.addEventListener("input", () => { settings.noise = noiseToggle.checked });
    flickerToggle.addEventListener("input", () => { settings.flicker = flickerToggle.checked });
    darkToggle.addEventListener("input", () => { settings.dark = darkToggle.checked });
    blurToggle.addEventListener("input", () => { settings.textBlur = blurToggle.checked });
        
    controls.addEventListener("input", () => { updateStyles(settings) });    
    updateStyles(settings);
});
