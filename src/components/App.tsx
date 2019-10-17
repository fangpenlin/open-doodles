import "./App.css";

import * as FileSaver from "file-saver";
import * as ReactDOM from "react-dom";

import React, {
  ComponentClass,
  RefObject,
  createRef,
  useRef,
  useState
} from "react";
import SideBar, { ColorConfig } from "./SideBar";

import BikiniDoodle from "./doodles/BikiniDoodle";
import DancingDoodle from "./doodles/DancingDoodle";
import DoodleCell from "./DoodleCell";
import { default as DoodleProps } from "./doodles/Props";
import GroovySittingDoodle from "./doodles/GroovySittingDoodle";
import IceCreamDoodle from "./doodles/IceCreamDoodle";
import JSZip from "jszip";
import JumpingDoodle from "./doodles/JumpingDoodle";
import LovingDoodle from "./doodles/LovingDoodle";
import MeditatingDoodle from "./doodles/MeditatingDoodle";
import MobileSideBar from "./MobileSideBar";
import MoshingDoodle from "./doodles/MoshingDoodle";
import PettingDoodle from "./doodles/PettingDoodle";
import ReadingDoodle from "./doodles/ReadingDoodle";
import RollerSkatingDoodle from "./doodles/RollerSkatingDoodle";
import RollingDoodle from "./doodles/RollingDoodle";
import RunningDoodle from "./doodles/RunningDoodle";
import SelfieDoodle from "./doodles/SelfieDoodle";
import SittingDoodle from "./doodles/SittingDoodle";
import SprintingDoodle from "./doodles/SprintingDoodle";
import StrollingDoodle from "./doodles/StrollingDoodle";
import SwingingDoodle from "./doodles/SwingingDoodle";
import UnboxingDoodle from "./doodles/UnboxingDoodle";
import ZombieingDoodle from "./doodles/ZombieingDoodle";

const options: Array<ColorConfig> = [
  {
    inkColor: "#000000",
    accentColor: "#ff6161",
    backgroundColor: "#FFFFFF00"
  },
  {
    inkColor: "#2d3d8b",
    accentColor: "#7fbbca",
    backgroundColor: "#FFFFFF00"
  },
  {
    inkColor: "#ff6161",
    accentColor: "#b9efe1",
    backgroundColor: "#eee98d"
  },
  {
    inkColor: "#000000",
    accentColor: "#ff6161",
    backgroundColor: "#FFFFFF00"
  },
  {
    inkColor: "#000000",
    accentColor: "#ff6161",
    backgroundColor: "#FFFFFF00"
  },
  {
    inkColor: "#000000",
    accentColor: "#ff6161",
    backgroundColor: "#FFFFFF00"
  }
  // TODO: add more sensable themes
];

interface State {
  readonly tabIndex: number;
  readonly optionIndex: number;
  readonly customConfig: ColorConfig;
}

interface FileObject {
  readonly fileName: string;
  readonly blob: Blob;
}

function triggerDownload(file: FileObject) {
  FileSaver.saveAs(file.blob, file.fileName);
}

function renderPNG(args: {
  name: string;
  backgroundColor: string;
  canvasRef: HTMLCanvasElement;
  svgRef: SVGSVGElement;
}): Promise<FileObject> {
  return new Promise((resolve, reject) => {
    const { name, canvasRef, backgroundColor, svgRef } = args;
    const svgNode: HTMLElement = ReactDOM.findDOMNode(svgRef) as HTMLElement;
    const canvas = canvasRef;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    const anyWindow = window as any;
    const DOMURL = anyWindow.URL || anyWindow.webkitURL || window;

    const data = svgNode.outerHTML;
    const img = new Image();
    const svg = new Blob([data], { type: "image/svg+xml" });
    const url = DOMURL.createObjectURL(svg);

    const svgWidth = parseInt(svgNode.getAttribute("width")!);
    const svgHeight = parseInt(svgNode.getAttribute("height")!);

    img.onload = () => {
      ctx.save();
      ctx.scale(canvas.width / svgWidth, canvas.height / svgHeight);
      ctx.drawImage(img, 0, 0);
      ctx.restore();
      DOMURL.revokeObjectURL(url);
      canvasRef.toBlob(blob => {
        resolve({ blob: blob!, fileName: name + ".png" });
      });
    };
    img.onerror = reject;
    img.src = url;
  });
}

async function renderSVG(args: {
  name: string;
  backgroundColor: string;
  svgRef: SVGSVGElement;
}): Promise<FileObject> {
  const { name, backgroundColor, svgRef } = args;
  const svgNode: HTMLElement = ReactDOM.findDOMNode(svgRef) as HTMLElement;
  // TODO: maybe we should find a better way to do this? like make each
  //         doodle component consume background color as well
  const childNode = ReactDOM.findDOMNode(svgNode.children[0]) as HTMLElement;
  const oldFill = childNode.getAttribute("fill");
  childNode.setAttribute("fill", backgroundColor);
  const data = svgNode.outerHTML;
  childNode.setAttribute("fill", oldFill!);
  const blob = new Blob([data], { type: "image/svg+xml" });
  return {
    fileName: name + ".svg",
    blob
  };
}

async function generatePack(args: {
  canvasRef: HTMLCanvasElement;
  doodles: Array<ComponentClass<DoodleProps>>;
  svgRefs: Array<RefObject<SVGSVGElement>>;
  backgroundColor: string;
}): Promise<FileObject> {
  const { canvasRef, doodles, svgRefs, backgroundColor } = args;

  const zip = new JSZip();
  const svgPromises = doodles.map((doodleClass, index) => {
    const svgRef = svgRefs[index].current!;
    return renderSVG({
      name: doodleClass.name,
      svgRef,
      backgroundColor
    });
  });
  const svgFolder = zip.folder("svg");
  await Promise.all(svgPromises).then(files => {
    files.forEach(file => {
      svgFolder.file(file.fileName, file.blob);
    });
  });

  // Notice: png rendering is using the same canvas, so that we cannot run
  //            it in parallel. if we want better performance, we can make it
  //           use a new canvas every single time when rendering.
  const pngFolder = zip.folder("png");
  for (let i = 0; i < doodles.length; ++i) {
    const doodleClass = doodles[i];
    const svgRef = svgRefs[i].current!;
    const file = await renderPNG({
      name: doodleClass.name,
      svgRef,
      canvasRef,
      backgroundColor
    });
    pngFolder.file(file.fileName, file.blob);
  }

  const blob = await zip.generateAsync({ type: "blob" });
  return {
    fileName: "open-doodles.zip",
    blob
  };
}

const App: React.FC = () => {
  const [state, setState] = useState<State>({
    optionIndex: 1,
    tabIndex: 0,
    customConfig: {
      accentColor: "",
      inkColor: "",
      backgroundColor: ""
    }
  });
  // TODO: maybe need to use useCallback to memorize this?
  const onSelectOption = (optionIndex: number) => {
    setState((oldStatus: State) => ({
      ...oldStatus,
      customConfig:
        oldStatus.optionIndex !== optionIndex
          ? options[optionIndex]
          : oldStatus.customConfig,
      optionIndex
    }));
  };
  const onSelectTab = (tabIndex: number) => {
    setState((oldStatus: State) => ({
      ...oldStatus,
      tabIndex
    }));
  };
  const onCustomConfigChange = (customConfig: ColorConfig) => {
    setState((oldStatus: State) => ({
      ...oldStatus,
      customConfig
    }));
  };
  const { optionIndex, tabIndex, customConfig } = state;
  var config: ColorConfig = options[optionIndex];
  if (
    tabIndex === 1 &&
    customConfig.inkColor.length &&
    customConfig.accentColor.length &&
    customConfig.backgroundColor
  ) {
    config = customConfig;
  }
  const { backgroundColor } = config;
  const doodles: Array<ComponentClass<DoodleProps>> = [
    BikiniDoodle,
    SprintingDoodle,
    MoshingDoodle,
    MeditatingDoodle,
    GroovySittingDoodle,
    SwingingDoodle,
    ZombieingDoodle,
    UnboxingDoodle,
    DancingDoodle,
    StrollingDoodle,
    RollingDoodle,
    RollerSkatingDoodle,
    JumpingDoodle,
    SittingDoodle,
    SelfieDoodle,
    IceCreamDoodle,
    ReadingDoodle,
    RunningDoodle,
    LovingDoodle,
    PettingDoodle
  ];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const svgRefs = useRef<Array<RefObject<SVGSVGElement>>>(
    doodles.map(() => createRef<SVGSVGElement>())
  );
  const onDownloadPack = () => {
    generatePack({
      doodles,
      canvasRef: canvasRef.current!,
      svgRefs: svgRefs.current,
      backgroundColor
    }).then(triggerDownload);
  };
  return (
    <div className="App">
      <SideBar
        options={options}
        customConfig={customConfig}
        onSelectOption={onSelectOption}
        onCustomConfigChange={onCustomConfigChange}
        optionIndex={optionIndex}
        onSelectTab={onSelectTab}
        tabIndex={tabIndex}
        onDownloadPack={onDownloadPack}
      />
      <div
        className="App-section"
        style={{
          backgroundColor
        }}
      >
        <div className="App-doodle-collection">
          {doodles.map((doodleClass, index) => {
            const svgRef = svgRefs!.current![index];
            return (
              <DoodleCell
                key={doodleClass.name}
                doodleClass={doodleClass}
                svgRef={svgRef}
                onDownloadPNG={() => {
                  renderPNG({
                    name: doodleClass.name,
                    canvasRef: canvasRef.current!,
                    backgroundColor,
                    svgRef: svgRef!.current!
                  }).then(triggerDownload);
                }}
                onDownloadSVG={() => {
                  renderSVG({
                    name: doodleClass.name,
                    backgroundColor,
                    svgRef: svgRef!.current!
                  }).then(triggerDownload);
                }}
                config={config}
              />
            );
          })}
        </div>
      </div>
      <MobileSideBar
        options={options}
        onSelect={onSelectOption}
        selectedIndex={optionIndex}
        onDownloadPack={onDownloadPack}
      />
      <canvas
        ref={canvasRef}
        style={{ display: "none" }}
        width="1024"
        height="768"
      />
    </div>
  );
};

export default App;
