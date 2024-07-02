import { Modal, ModalBody, ModalContent } from "@nextui-org/react";
import { FC, ReactNode } from "react";

type Justify =
  | "start"
  | "end"
  | "center"
  | "between"
  | "around"
  | "evenly"
  | "stretch";

type Items = "start" | "end" | "center" | "baseline" | "stretch";

export const Row: FC<{
  children: ReactNode;
  x?: Justify;
  y?: Items;
  className?: string;
}> = ({ children, x: justify = "start", y: items = "start", className }) => {
  return (
    <div
      className={`flex flex-row justify-${justify} items-${items} ${className}`}
    >
      {children}
    </div>
  );
};

export const Column: FC<{
  children: ReactNode;
  y?: Justify;
  x?: Items;
  className?: string;
}> = ({
  children,
  className: width,
  y: justify = "start",
  x: items = "start",
}) => {
  return (
    <div className={`flex flex-col ${width} justify-${justify} items-${items}`}>
      {children}
    </div>
  );
};

export const Stack: FC<{
  children: ReactNode[];
}> = ({ children }) => {
  return (
    <div className="flex relative">
      {children.map((child, i) => (
        <div key={i} className="flex w-full absolute top-0 left-0">
          {child}
        </div>
      ))}
    </div>
  );
};

export const WithNav: FC<{
  children: ReactNode;
  bottomBar: ReactNode;
}> = ({ children, bottomBar }) => {
  let list = [];
  if (Array.isArray(children)) {
    list = children;
  } else {
    list = [children];
  }

  return (
    <div className="flex relative h-screen w-screen">
      {list.map((child, i) => (
        <div key={i} className="flex w-full absolute top-0 left-0">
          <ScrolledPage>
            {child}
            <div className="w-28 h-28"></div>
          </ScrolledPage>
        </div>
      ))}
      {bottomBar && (
        <div className="flex w-screen absolute bottom-0 left-0 py-1">
          {bottomBar}
        </div>
      )}
    </div>
  );
};

export const SizedBox: FC<{
  width?: string;
  height?: string;
}> = ({ width, height }) => {
  return <div className={`w-${width} h-${height}`}></div>;
};

export const ScrolledPage: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="w-screen h-screen overflow-y-scroll">{children}</div>;
};

export const StaticPage: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="w-screen h-screen overflow-hidden">{children}</div>;
};

export const CommonModal: FC<{
  children: ReactNode;
  isOpen: boolean;
  onOpenChange: () => void;
}> = ({ children, isOpen, onOpenChange }) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className="p-0">
        {() => (
          <>
            <ModalBody className="pb-0 px-0 pt-0">{children}</ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
