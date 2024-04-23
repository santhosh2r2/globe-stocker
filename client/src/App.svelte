<script>
  import countriesRaw from "./assets/custom.geo.json?raw";
  import imgUrl from "./assets/earth_day.jpeg";
  import { TrackballControls } from "three/addons/controls/TrackballControls.js";
  import * as THREE from "three";
  import ThreeGlobe from "three-globe";
  import { onMount } from "svelte";

  window.THREE = THREE;
  const countries = JSON.parse(countriesRaw);

  onMount(() => {
    const Globe = new ThreeGlobe()
      .globeImageUrl(imgUrl)
      .polygonsData(
        countries.features.filter((d) => d.properties.ISO_A2 !== "AQ"),
      )
      .polygonCapColor(() => "rgba(200, 0, 0, 0.7)")
      .polygonSideColor(() => "rgba(0, 200, 0, 0.1)")
      .polygonStrokeColor(() => "#111");

    // // Setup renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth-30, window.innerHeight-20);
    document.getElementById("globeViz").appendChild(renderer.domElement);

    // Setup scene
    const scene = new THREE.Scene();
    scene.add(Globe);
    scene.add(new THREE.AmbientLight(0xcccccc, Math.PI));
    scene.add(new THREE.DirectionalLight(0xffffff, 0.6 * Math.PI));

    // Setup camera
    const camera = new THREE.PerspectiveCamera();
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    camera.position.z = 500;

    // Add camera controls
    const tbControls = new TrackballControls(camera, renderer.domElement);
    tbControls.minDistance = 101;
    tbControls.rotateSpeed = 5;
    tbControls.zoomSpeed = 0.8;

    // Kick-off renderer
    (function animate() {
      // IIFE
      // Frame cycle
      tbControls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    })();
  });
</script>

<div id="globeViz"></div>
