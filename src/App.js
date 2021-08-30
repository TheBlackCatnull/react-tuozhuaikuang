import "./App.css";

import img3 from "./img/3.jpg";
import img4 from "./img/4.jpg";
import img5 from "./img/5.jpg";
import img6 from "./img/6.jpg";
import img7 from "./img/7.jpg";
import img8 from "./img/8.jpg";
import useDraggable from "./useDraggable";
const list = [
  {
    src: img3,
    title: "自来也",
  },
  {
    title: "雏田",
    src: img4,
  },
  {
    title: "鸣人",
    src: img5,
  },
  {
    title: "迪达拉",
    src: img6,
  },
  {
    title: "卡卡西",
    src: img7,
  },
  {
    title: "小樱",
    src: img8,
  },
];

function cls(def, ...conditions) {
  const list = [def];
  conditions.forEach((cond) => {
    if (cond[0]) {
      list.push(cond[1]);
    }
  });
  return list.join(" ");
}

export default function App() {
  return (
    <div className="App">
      <DraggableList list={list} />
    </div>
  );
}

function DraggableList({ list }) {
  const { dragList, createDraggerProps, createDropperProps } =
    useDraggable(list);
  return dragList.map((item, i) => {
    if (item.type === "BAR") {
      return <Bar id={i} {...createDropperProps(i)} key={item.id} />;
    } else {
      return (
        <Draggable {...createDraggerProps(i, item.id)}>
          <Card {...item.data} />
        </Draggable>
      );
    }
  });
}

//List
// Draggable
// Bar
// Draggable
// Bar

function Draggable({ children, eventHandlers, dragging, id }) {
  return (
    <div
      {...eventHandlers}
      draggable={true}
      className={cls("draggable", [dragging === id, "dragging"])}
    >
      {children}
    </div>
  );
}

function Bar({ id, dragging, dragOver, eventHandlers }) {
  if (id === dragging + 1) {
    return null;
  }

  return (
    <div
      {...eventHandlers}
      className={cls("draggable--bar", [dragOver === id, "dragover"])}
    >
      <div
        className="inner"
        style={{
          height: id === dragOver ? "80px" : "0px",
        }}
      />
    </div>
  );
}

function Card({ src, title }) {
  return (
    <div className="card">
      <img src={src} />
      <span>{title}</span>
    </div>
  );
}
