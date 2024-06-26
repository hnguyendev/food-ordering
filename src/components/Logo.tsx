const Logo = () => {
  return (
    <div className="flex items-center justify-center gap-x-4">
      <img
        src="/bg.jpg"
        alt="Logo"
        className={`h-16 overflow-hidden transition hidden lg:block rounded-full`}
      />
      <div className="hidden lg:block">
        <p className="text-lg font-medium">Eat good</p>
        <p className="text-sm text-muted-foreground">Feel good</p>
      </div>
    </div>
  );
};

export default Logo;
