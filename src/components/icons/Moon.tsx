import { forwardRef } from "react";
import type { SVGProps } from "react";

const Moon = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => {
  return (
    <svg {...props} ref={ref} height="24" width="24" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.543 2.453a.75.75 0 00-.71-1.195c-4.87.735-8.583 5.03-8.583 10.19 0 5.672 4.487 10.302 10.062 10.302 4.29 0 7.94-2.746 9.39-6.593a.75.75 0 00-1.028-.94 7.325 7.325 0 01-3.189.727c-4.14 0-7.527-3.447-7.527-7.74 0-1.793.592-3.44 1.585-4.751z"
        fillRule="evenodd"
      />
    </svg>
  );
});

export default Moon;
