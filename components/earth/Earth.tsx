"use client";
import React, { useEffect } from "react";
import * as THREE from "three";

export const Earth = () => {
  useEffect(() => {
    // シーン、カメラ、レンダラーを初期化
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
    camera.position.z = 3;

    const scene = new THREE.Scene();

    // 地球のテクスチャを読み込む
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load("/earth.jpeg");

    const earthGeometry = new THREE.SphereGeometry(1, 32, 32);
    const earthMaterial = new THREE.MeshBasicMaterial({ map: earthTexture });

    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earthMesh);

    // Canvasを使って文字を描画
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (context) {
      canvas.width = 512;
      canvas.height = 256;

      // 背景を透明にし、文字のみを描画
      context.clearRect(0, 0, canvas.width, canvas.height); // 背景を透明に
      context.fillStyle = "white"; // 文字の色
      context.font = "48px Arial";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText("禁煙はあなたを救う!", canvas.width / 2, canvas.height / 2);
    }

    // テクスチャをスプライトとして追加
    const spriteTexture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({ map: spriteTexture, transparent: true });
    const sprite = new THREE.Sprite(spriteMaterial);

    // 文字を地球の前面に配置
    sprite.position.set(0, 0, 1.5); // 球体の前方に配置
    sprite.scale.set(2, 1, 1); // スプライトのサイズを調整
    scene.add(sprite);

    // レンダラーの設定
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // アニメーション関数
    function animation(time: number) {
      earthMesh.rotation.y = time / 2000;
      earthMesh.rotation.x = time / 4000;
      renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(animation);

    // クリーンアップ処理
    return () => {
      renderer.dispose();
    };
  }, []);

  return null;
};
