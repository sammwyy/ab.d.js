// Utils
export function makeID(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

// Tests
export type TestType = "dom" | "scripts-interceptor";
export type TestFunc = () => boolean | Promise<boolean> | (() => boolean);

// DOM
export const TestScriptInterceptor = async () => {
  const files = ["ads.js", "ad_top.js", "ads", "ad?type=banner"];
  const originalRes = await fetch(`/${makeID(32)}/${makeID(6)}.js`);

  for (const file of files) {
    const fullURL = `/${makeID(32)}/${file}`;
    const res = await fetch(fullURL, {
      method: "GET",
    }).catch(() => ({ ok: false, status: 500 }));

    if (res.status != originalRes.status) {
      return true;
    }
  }

  return false;
};

export const TestDom = async () => {
  const runTest = (name: string) => {
    const rid = makeID(8);
    const el = document.createElement("div");

    el.classList.add(name);
    el.style.display = "block";
    el.style.width = "5px";
    el.style.opacity = "0.02";
    el.style.transform = "translate(-999999px)";
    el.style.position = "absolute";
    el.style.color = "transparent";
    el.innerHTML = `<div id="${rid}"></div>`;

    document.body.appendChild(el);

    return new Promise((resolve) => {
      setTimeout(() => {
        const result = document.getElementById(rid);
        if (!result) return resolve(true);

        const isInDOM = result.parentElement?.parentElement == document.body;
        const hasStyles =
          el.style.display == "block" &&
          el.style.width == "5px" &&
          el.style.opacity == "0.02" &&
          el.style.transform == "translate(-999999px)";

        if (isInDOM && hasStyles) {
          resolve(false);
          result.remove();
          el.remove();
        } else {
          resolve(true);
        }
      }, 1);
    });
  };

  const names = [
    "adsbox",
    "ads",
    "ad",
    "main-ad-300x600-banner",
    "ad-banner",
    "-ad-right",
    "-ad-sidebar",
  ];

  for (const name of names) {
    const result = await runTest(name);
    if (result) {
      return true;
    }
  }

  return false;
};

// Main class
const withLog = async (name: string, fun: TestFunc) => {
  const functionResult = await fun();
  const result =
    typeof functionResult == "function" ? functionResult() : functionResult;

  if (result) {
    console.log("[AB.d] ❌ Triggered " + name + " test.");
  } else {
    console.log("[AB.d] ✅ Pass " + name + " test.");
  }

  return result;
};

export type ABDSettings = {
  dom?: boolean;
  interceptor?: boolean;
};

export default class ABD {
  async runTestDom(): Promise<boolean> {
    return await withLog("DOM", TestDom);
  }

  async runTestScriptInterceptor(): Promise<boolean> {
    return await withLog("Script-Interceptor", TestScriptInterceptor);
  }

  async hasAdBlock({
    dom,
    interceptor,
  }: ABDSettings = {}): Promise<TestType | null> {
    if (dom) {
      const result = await this.runTestDom();
      if (result) return "dom";
    }

    if (interceptor) {
      const result = await this.runTestScriptInterceptor();
      if (result) return "scripts-interceptor";
    }

    return null;
  }
}

declare global {
  interface Window {
    ABD: ABD;
  }
}

window.ABD = new ABD();
