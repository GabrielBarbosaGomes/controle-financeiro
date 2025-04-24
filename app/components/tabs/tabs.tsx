import { Paper, Tabs, Tab } from "@mui/material";
import type { TabProps } from "@mui/material";
import { Children, type PropsWithChildren, cloneElement, useEffect, useState, type ReactNode, isValidElement, type ReactElement } from "react";
import flattenChildren from "react-keyed-flatten-children";
import { useAppThemeProvider } from "~/shared/context/themeContext";

type HorizontalTabsProps = {
  children: ReactNode;
  defaultTabIndex?: number;
  selectedTab?: number;
  areTabsClickable?: boolean;
  withoutRadius?: boolean;
  bottomOnlyActive?: boolean;
  onChangeTab?: (value: number) => void;
  disableShadow?: boolean;
};

type TabPanelProps = PropsWithChildren<{
  index: number;
  value: number;
}>;

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      style={{ width: "100%" }}
      id={`horizontal-tabpanel-${index}`}
      aria-labelledby={`horizontal-tab-${index}`}
      {...other}
    >
      {value === index ? children : null}
    </div>
  );
}

export function HorizontalTabs({
  defaultTabIndex = 0,
  selectedTab = 0,
  areTabsClickable = true,
  withoutRadius = false,
  bottomOnlyActive = false,
  onChangeTab,
  disableShadow,
  ...props
}: HorizontalTabsProps) {
  const [currentTab, setCurrentTab] = useState(defaultTabIndex);
  const { themeName } = useAppThemeProvider();

  useEffect(() => {
    !areTabsClickable ? setCurrentTab(selectedTab) : null;
  }, [areTabsClickable, selectedTab]);

  return (
    <>
      <Paper>
        <Tabs
          value={currentTab}
          orientation="horizontal"
          aria-label="Abas de edição"
          onChange={
            areTabsClickable
              ? (_, value) => {
                  setCurrentTab(value);
                  onChangeTab && onChangeTab(value);
                }
              : () => {}
          }
          sx={{
            borderBottom: bottomOnlyActive ? 0 :2,
            borderColor: bottomOnlyActive ? "unset" : "primary.dark",
            width: "100% !important",
            bgcolor: "primary.dark",
            borderRadius: withoutRadius ? "0px" : "8px 8px 0px 0px",
            boxShadow: disableShadow
              ? ""
              : "0px 1px 3px 0px rgba(109, 115, 132, 0.20), 0px 2px 1px 0px rgba(109, 115, 132, 0.12), 0px 1px 1px 0px rgba(109, 115, 132, 0.14)",
            // color: "primary.contrastText",
            "& .MuiButtonBase-root": {
              justifyContent: "center",
              alignItems: "center",
              padding: "8px",
              textTransform: "capitalize",
              flex: "1",
              minWidth:
                Children.count(props.children) > 0 ? (100 / Children.count(props.children)).toString() + "%" : "100%",
            },
            "& .MuiTabs-flexContainer": {
              width: "100%",
              display: "flex",
              alignItems: "stretch",
              justifyContent: "stretch",
            },
            "& .MuiTabs-indicator": { display: "none" },
            "& .MuiTab-textColorPrimary": {
              color: "primary.contrastText",
            },
          }}
        >
          {Children.map(flattenChildren(props.children), (child, index) => {
            if (isValidElement(child) && child.type === HorizontalTab) {
              // child as ReactElement<HorizontalTabProps>
              return (
                <Tab
                  label={(child as ReactElement<HorizontalTabProps>)?.props?.label}
                  // disabled={!!child.props.disabled}
                  // icon={child.props.icon}
                  sx={{
                    bgcolor: currentTab === index ? "primary.dark" : "inherit",
                    pointerEvents: "auto !important",
                    borderBottom: bottomOnlyActive ? 1 : 0,
                    borderColor: bottomOnlyActive && currentTab === index ? "primary.main" : "pink",
                    // color: currentTab === index ? "primary.dark" : "primary.contrastText",
                  }}
                />
              );
            }
            return child;
          })}
        </Tabs>
      </Paper>
      <Paper>
        {Children.map(flattenChildren(props.children), (child, index) => {
          if (isValidElement(child) && child.type === HorizontalTab) {
            return cloneElement<PrivateHorizontalTabProps>(child as ReactElement<PrivateHorizontalTabProps>, {
              index,
              currentTab,
            });
          }
          return child;
        })}
      </Paper>
    </>
  );
}

type PrivateHorizontalTabProps = {
  index: number;
  currentTab: number;
};

type HorizontalTabProps = {
  disabled?: boolean;
  label: TabProps["label"];
  children: ReactNode;
};

function HorizontalTab(props: HorizontalTabProps) {
  const { index, currentTab, ...other } = props as PrivateHorizontalTabProps & HorizontalTabProps;
  return (
    <TabPanel index={index} value={currentTab} {...other}>
      {props.children}
    </TabPanel>
  );
}

HorizontalTabs.Tab = HorizontalTab;
