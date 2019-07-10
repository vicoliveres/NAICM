
const width = d3.select('#aeropuerto').node().getBoundingClientRect().width;
const height = (d3.select('#aeropuerto').node().getBoundingClientRect().width)*0.56321839;

const tooltip = d3.select("#tooltip").append("div")
    .style("opacity", 0);

var xbar = d3.scaleLinear().range([0, width-8]);
var xcircle = d3.scaleLinear().range([0, width]);
var xwidth = d3.scaleLinear().range([0, width]);

var infoAeropuerto = function(d3) {

  const svg = d3
    .select('#aeropuerto')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g');

  var imgs = svg.selectAll("image").data([0]);

  var imagen = imgs.enter()
      .append("svg:image")
      .attr("xlink:href", "aeroport-color-bn.jpg")
      .attr("width", width)
      .attr("height", height);

        //Load in empreses data
        d3.csv("EmpresesAeroport.csv", function(data) {

          xbar.domain([0, d3.max(data, function(d) { return +d.ImpComprometido; })]);
          xcircle.domain([0, 100]);
          console.log(data);

        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", function(d){ return xwidth(d.xposition/696); })
            .attr("y", function(d){ return xwidth(d.yposition/696); })
            .attr("width", xwidth(80/696))
            .attr("height", xwidth(80/696))
            .attr("fill", "#799428")
            .style("opacity", 0)
            .on("mousemove", function(d) {
              d3.select(this)
                .style('opacity', .7);
              tooltip.transition()
                .duration(100)
                .style("opacity", 1)
                .attr("class", "tooltip");
              tooltip.html("<b>Empresa: </b>" + d.Empresa + "</br><b>Estado: </b>" + d.Estado + "</br><b>Proyecto: </b>" + d.Descr +
              "</br></br><b>Importe pagado* / comprometido: </b>" + d.ImpPagadoL + " / " + d.ImpComprometidoL + "</br>");
              tooltip.append("div")
                  .style("width", xbar(d.ImpComprometido) + "px")
                  .style("height", "25px")
                  .style("background-color", "#799428")
                  .append("div")
                  .style("width", xbar(d.ImpPagado) + "px")
                  .style("height", "25px")
                  .style("background-color", "#2b3804");
              if (d.ImpPagado > 0) {
                tooltip.append("text")
                    .html("</br><b>Avance físico: </b>" + d.AvaceFisicoL)
                    .append("div")
                    .style("width", width)
                    .style("height", "2px")
                    .style("position", "relative")
                    .style("top", "5px")
                    .style("background-color", "grey")
                    .append("div")
                    .style("width", "18px")
                    .style("height", "18px")
                    .style("background-color", "#799428")
                    .style("border-radius", "25px")
                    .style("position", "relative")
                    .style("left", xcircle(d.AvaceFisico) + "px")
                    .style("bottom", "7px");
                tooltip.append("text")
                    .html("</br><b>Avance financiero: </b>" + d.AvanceFinancieroL)
                    .append("div")
                    .style("width", width)
                    .style("height", "2px")
                    .style("position", "relative")
                    .style("top", "5px")
                    .style("background-color", "grey")
                    .append("div")
                    .style("width", "18px")
                    .style("height", "18px")
                    .style("background-color", "#799428")
                    .style("border-radius", "25px")
                    .style("position", "relative")
                    .style("left", xcircle(d.AvanceFinanciero) + "px")
                    .style("bottom", "7px");
              }
              else {};
              tooltip.append("text")
                  .html('</br><a href="' + d.Contrato + '">Enlace al contrato</a></br>');
              tooltip.append("text")
                  .text("*Segundo semestre de 2018");
                })
            .on("mouseout", function(d) {
              d3.select(this)
                .style("opacity", 0);
              });

});

}(d3);
