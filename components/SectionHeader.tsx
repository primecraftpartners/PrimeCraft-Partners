type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  text?: string;
  light?: boolean;
};

export function SectionHeader({ eyebrow, title, text, light = false }: SectionHeaderProps) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
      <h2 className={`text-3xl font-black leading-tight sm:text-4xl ${light ? "text-white" : "text-ink"}`}>
        {title}
      </h2>
      {text ? <p className={`mt-4 text-base leading-7 ${light ? "text-white/75" : "text-ink/65"}`}>{text}</p> : null}
    </div>
  );
}
