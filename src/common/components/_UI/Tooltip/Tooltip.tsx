import * as React from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  useMergeRefs,
  FloatingPortal,
  // autoPlacement,
  useClick,
} from "@floating-ui/react";
import type { Placement } from "@floating-ui/react";
import classNames from "classnames";

interface TooltipOptions {
  initialOpen?: boolean;
  placement?: Placement;
  open?: boolean;
  onlyClick?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function useTooltip({
  initialOpen = false,
  placement = "bottom-end",
  open: controlledOpen,
  onlyClick = false,
  onOpenChange: setControlledOpen,
}: TooltipOptions = {}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      // autoPlacement(),
      offset(5),
      flip({
        crossAxis: placement.includes("-"),
        fallbackAxisSideDirection: "start",
        padding: 5,
      }),
      shift({ padding: 5 }),
    ],
  });

  const context = data.context;
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });

  const events = [dismiss, role];

  if (onlyClick) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const click = useClick(context);
    events.push(click);
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const hover = useHover(context, {
      move: false,
      enabled: controlledOpen == null,
    });

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const focus = useFocus(context, {
      enabled: controlledOpen == null,
    });
    events.push(hover, focus);
  }

  const interactions = useInteractions(events);

  return React.useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
    }),
    [open, setOpen, interactions, data]
  );
}

type ContextType = ReturnType<typeof useTooltip> | null;

const TooltipContext = React.createContext<ContextType>(null);

export const useTooltipContext = () => {
  const context = React.useContext(TooltipContext);

  if (context == null) {
    throw new Error("Tooltip components must be wrapped in <Tooltip />");
  }

  return context;
};

export function TooltipMain({
  children,
  ...options
}: {
  children: React.ReactNode;
} & TooltipOptions) {
  const tooltip = useTooltip(options);

  return (
    <TooltipContext.Provider
      value={{
        ...tooltip,
      }}
    >
      {children}
    </TooltipContext.Provider>
  );
}

export const TooltipTrigger = React.forwardRef<
  HTMLElement,
  React.HTMLProps<HTMLElement> & { asChild?: boolean }
>(function TooltipTrigger({ children, asChild = false, ...props }, propRef) {
  const context = useTooltipContext();
  const childrenRef = (children as any).ref;
  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

  // `asChild` allows the user to pass any element as the anchor
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children,
      context.getReferenceProps({
        ref,
        ...props,
        ...children.props,
        "data-state": context.open ? "open" : "closed",
      })
    );
  }

  return (
    <div
      ref={ref}
      // The user can style the trigger based on the state
      data-state={context.open ? "open" : "closed"}
      {...context.getReferenceProps(props)}
    >
      {children}
    </div>
  );
});

export const TooltipContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(function TooltipContent({ style, ...props }, propRef) {
  const context = useTooltipContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);

  if (!context.open) return null;

  return (
    <FloatingPortal>
      <div
        ref={ref}
        style={{
          ...context.floatingStyles,
          ...style,
        }}
        {...context.getFloatingProps(props)}
        className={classNames(
          props.className,
          "wco-text-sm wco-py-1.5 wco-px-2.5 wco-rounded-sm wco-shadow-lg wco-border ",
          props.type === "light" &&
            "wco-bg-white wco-border-light-neutral-2 wco-text-deep-blue",
          props.type === "dark" && "wco-bg-black wco-text-white"
        )}
      />
    </FloatingPortal>
  );
});

const Tooltip = ({
  open,
  onOpenChange,
  children,
  tooltipContent,
  hidden,
  type = "light",
  onlyClick,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  tooltipContent: React.ReactNode;
  hidden?: boolean;
  type?: "light" | "dark";
  onlyClick?: boolean;
}) => {
  return (
    <TooltipMain open={open} onOpenChange={onOpenChange} onlyClick={onlyClick}>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent
        className="wco-z-50"
        hidden={hidden}
        type={type}
        open={open}
      >
        {tooltipContent}
      </TooltipContent>
    </TooltipMain>
  );
};

export default Tooltip;
