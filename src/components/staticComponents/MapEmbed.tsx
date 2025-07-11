// const locationLink: string =
//   "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.5966308865627!2d108.150113841051!3d16.08640833903894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314218cf30589155%3A0xf58925c2840a96f2!2zMTMwIE5ndXnhu4VuIENow6FuaCwgSG_DoCBLaMOhbmggQuG6r2MsIExpw6puIENoaeG7g3UsIMSQw6AgTuG6tW5nIDU1MDAwMCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1744186571522!5m2!1svi!2s";

const DUTLocationLink: string =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.8424945014303!2d108.14816833382902!3d16.073661115257337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314218d68dff9545%3A0x714561e9f3a7292c!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBCw6FjaCBLaG9hIC0gxJDhuqFpIGjhu41jIMSQw6AgTuG6tW5n!5e0!3m2!1svi!2sus!4v1744365099854!5m2!1svi!2sus";

const MapEmbed = () => {
  return (
    <div className="space-y-6">
      <h2 className="from-primary bg-gradient-to-r to-blue-600 bg-clip-text text-2xl font-bold text-transparent">
        Our Location
      </h2>
      <div className="aspect-square overflow-hidden rounded-lg shadow-sm md:aspect-video">
        <iframe
          src={DUTLocationLink}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="HiRise Office Location"
          aria-label="Map showing HiRise office location"
          className="transition-all hover:opacity-90"
        />
      </div>
    </div>
  );
};

export default MapEmbed;
