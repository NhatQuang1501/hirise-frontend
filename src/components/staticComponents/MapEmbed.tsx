const MapEmbed = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Our Location</h2>
      <div className="aspect-square overflow-hidden rounded-lg md:aspect-video">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.5966308865627!2d108.150113841051!3d16.08640833903894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314218cf30589155%3A0xf58925c2840a96f2!2zMTMwIE5ndXnhu4VuIENow6FuaCwgSG_DoCBLaMOhbmggQuG6r2MsIExpw6puIENoaeG7g3UsIMSQw6AgTuG6tW5nIDU1MDAwMCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1744186571522!5m2!1svi!2s"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="HiRise Office Location"
          aria-label="Map showing HiRise office location"
        />
      </div>
    </div>
  );
};

export default MapEmbed;
