import * as React from "react";
import { AppButton } from "../AppButton";

type DangerZoneProps = {
  loading: boolean;
  text: string;
  title: string;
  confirmation?: string;
  subtitle?: string;
  onConfirm: () => void;
};

export function DangerZone(props: DangerZoneProps) {
  const { title, subtitle = "", text, confirmation = title, loading, onConfirm } = props;

  return (
    <section className="DangerZone w-full flex flex-col gap-4">
      <h1 className="font-bold text-md text-red-500">Danger Zone</h1>
      <div className="w-full flex flex-col justify-center py-4 px-6 border-solid border border-red-500 rounded-xl">
        <h2 className="font-bold text-base text-slate-900">{title}</h2>
        {subtitle ? <p className="text-slate-900 pb-2">{subtitle}</p> : null}
        <p className="text-slate-900 pb-2">{text}</p>
        <AppButton
          title={confirmation}
          onClick={onConfirm}
          isLoading={loading}
          theme="danger"
          widthFull
        />
      </div>
    </section>
  );
}
