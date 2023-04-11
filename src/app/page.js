"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import cloudArrowUp from "../../public/cloudArrowup.svg";
import completeArchive from "../../public/completeArchive.svg";
import completeBar from "../../public/completeBar.svg";
import failedArchive from "../../public/failedArchive.svg";
import failedBar from "../../public/failedBar.svg";
import loadingArchive from "../../public/loadingArchive.svg";
import loadingBar from "../../public/loadingBar.svg";
import resumeButton from "../../public/resumeButton.svg";
import stopButton from "../../public/stopButton.svg";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "700"] });

export default function Home() {
  const inputRef = useRef();
  const [loading, setLoading] = useState(null);
  const [loadingSize, setLoadingSize] = useState({actual: 0, max: null});
  const [status, setStatus] = useState({ size: 0, name: "" });
  const [error, setError] = useState(false);

  const handleUpload = () => {
    inputRef.current.click();
  };

  const uploadFile = (file) => {
    if (!file) {
      setError(true);
      setStatus({ size: 0, name: "Nenhum arquivo" });
      return;
    }
    // if (file.size > 1024 * 1024) {
    //   setError('File size exceeds 1 MB')
    //   return;
    // }
    const size = parseFloat((file.size / 1000).toFixed(2))
    setError(false);
    setLoadingSize({actual: 0, max: size })
    setStatus({ size, name: file.name });
    setLoading(true);
  }

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    uploadFile(file)
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    uploadFile(file)
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [loading]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if(loadingSize.actual < loadingSize.max - 1)
        setLoadingSize(prev => ({...prev, actual: prev.actual + 1}));
    }, loadingSize);

    return () => clearInterval(intervalId);
  }, [loadingSize]);

  return (
    <main className={styles.main}>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleUpload}
        className={styles.areaImport}
      >
        <input
          type="file"
          ref={inputRef}
          onChange={handleFileSelect}
          style={{ display: "none" }}
        />
        <Image
          className={styles.buttonInteractive}
          src={cloudArrowUp}
          width={48}
          height={48}
          alt="cloud arrow up"
        />
        <p className={`${inter.className} ${styles.titleImportArea}`}>
          Importe seus arquivos
        </p>
        <p className={`${inter.className} ${styles.subtitleImportArea}`}>
          Arraste ou clique para fazer upload
        </p>
      </div>
      <div className={styles.archives}>
        {error ? (
          <div className={styles.failedArchive}>
            <Image
              className={styles.buttonInteractive}
              src={failedArchive}
              width={48}
              height={56}
              alt="failed upload icon"
            />
            <div>
              <div className={styles.headerLoadingArchive}>
                <p className={`${inter.className} ${styles.nameArchive}`}>
                  {status.name}
                </p>
                <Image
                  className={styles.buttonInteractive}
                  src={resumeButton}
                  alt="resume icon"
                />
              </div>
              <p className={`${inter.className} ${styles.weightArchive}`}>
                {status.size} KB
              </p>
              <Image src={failedBar} alt="failed bar"/>
            </div>
          </div>
        ) : loading ? (
          <div className={styles.loadingArchive}>
            <Image
              className={styles.buttonInteractive}
              src={loadingArchive}
              width={48}
              height={56}
              alt="loading icon"
            />
            <div>
              <div className={styles.headerLoadingArchive}>
                <p className={`${inter.className} ${styles.nameArchive}`}>
                  {status.name}
                </p>
                <Image className={styles.buttonInteractive} src={stopButton} alt="stop button"/>
              </div>
              <p className={`${inter.className} ${styles.weightArchive}`}>
                {loadingSize.actual} KB / {loadingSize.max} KB
              </p>
              <Image src={loadingBar} alt="loading bar"/>
            </div>
          </div>
        ) : loading === false && status.name ? (
          <div className={styles.completeArchive}>
            <Image
              className={styles.buttonInteractive}
              src={completeArchive}
              width={48}
              height={56}
              alt="complete icon"
            />
            <div>
              <div className={styles.headerLoadingArchive}>
                <p className={`${inter.className} ${styles.nameArchive}`}>
                  {status.name}
                </p>
              </div>
              <p className={`${inter.className} ${styles.weightArchive}`}>
                {status.size} KB
              </p>
              <Image src={completeBar} alt="complete bar" />
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
