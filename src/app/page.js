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
  return (
    <main className={styles.main}>
      <div className={styles.areaImport}>
        <Image className={styles.buttonInteractive} src={cloudArrowUp} width={48} height={48} />
        <p className={`${inter.className} ${styles.titleImportArea}`}>
          Importe seus arquivos
        </p>
        <p className={`${inter.className} ${styles.subtitleImportArea}`}>
          Arraste ou clique para fazer upload
        </p>
      </div>
      <div className={styles.archives}>
        <div className={styles.loadingArchive}>
          <Image className={styles.buttonInteractive} src={loadingArchive} width={48} height={56} />
          <div>
            <div className={styles.headerLoadingArchive}>
              <p className={`${inter.className} ${styles.nameArchive}`}>
                Scann_158.pdf
              </p>
              <Image className={styles.buttonInteractive} src={stopButton} />
            </div>
            <p className={`${inter.className} ${styles.weightArchive}`}>
              30 MB / 74 MB
            </p>
            <Image  src={loadingBar}/>
          </div>
        </div>
        <div className={styles.completeArchive}>
          <Image className={styles.buttonInteractive} src={completeArchive} width={48} height={56} />
          <div>
            <div className={styles.headerLoadingArchive}>
              <p className={`${inter.className} ${styles.nameArchive}`}>
                README.rm
              </p>
            </div>
            <p className={`${inter.className} ${styles.weightArchive}`}>
              12 KB
            </p>
            <Image  src={completeBar} />
          </div>
        </div>
        <div className={styles.failedArchive}>
          <Image className={styles.buttonInteractive} src={failedArchive} width={48} height={56} />
          <div>
            <div className={styles.headerLoadingArchive}>
              <p className={`${inter.className} ${styles.nameArchive}`}>
                picture1.jpeg
              </p>
              <Image className={styles.buttonInteractive} src={resumeButton} />
            </div>
            <p className={`${inter.className} ${styles.weightArchive}`}>
              6.3 MB
            </p>
            <Image src={failedBar} />
          </div>
        </div>
      </div>
    </main>
  );
}
