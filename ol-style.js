var styleFunction = function(feature, resolution) {
  var featureStyleFunction = feature.getStyleFunction();
  var featureProperties = feature.getProperties();
  if (featureStyleFunction) {
    return featureStyleFunction.call(feature, resolution);
  } else {
    if (("fill" in featureProperties) && ("stroke" in featureProperties)) {
      return new ol.style.Style({
        fill: new ol.style.Fill({
          color: featureProperties['fill']
        }),
        stroke: new ol.style.Stroke({
          color: featureProperties['stroke'],
          width: featureProperties['stroke-width']
        })
      });
    } else if ("fill" in featureProperties) {
      return new ol.style.Style({
        fill: new ol.style.Fill({
          color: featureProperties['fill']
        }),
      });
    } else if ("stroke" in featureProperties) {
      return new ol.style.Style({
        stroke: new ol.style.Stroke({
          color: featureProperties['stroke'],
          width: featureProperties['stroke-width']
        })
      })
    } else {
      switch (feature.getGeometry().getType()) {
        case 'Point': return new ol.style.Style({
          image: new ol.style.RegularShape({
            fill: new ol.style.Fill({
              color: 'rgba(0,0,0,1)'
            }),
            stroke: new ol.style.Stroke({
              color: '#000000',
              width: 1
            }),
            points: 3,
            radius: 15,
            rotation: Math.PI / 4,
            angle: 60
          }),
          text: new ol.style.Text({
            text: featureProperties['tags']['name'],
            scale: 1,
            offsetY: 10,
            fill: new ol.style.Fill({
              color: '#FFFFFF'
            }),
          })
        }); 
        break;
        
        case 'LineString': return new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: '#f00',
            width: 3
          })
        });
        break;

        case 'Polygon': return new ol.style.Style({
          fill: new ol.style.Fill({
            color: 'rgba(0,255,255,0.5)'
          }),
          stroke: new ol.style.Stroke({
            color: '#000',
            width: 5
          })
        });
        break;

        case 'MultiPoint': return new ol.style.Style({
          image: new ol.style.Circle({
            fill: new ol.style.Fill({
              color: 'rgba(255,0,255,0.5)'
            }),
            radius: 5,
            stroke: new ol.style.Stroke({
              color: '#f0f',
              width: 1
            })
          })
        });
        break;

        case 'MultiLineString': return new ol.style.Style({
          stroke: new ol.style.Stroke({
            color: '#0f0',
            width: 3
          })
        });
        break;

        case 'MultiPolygon': return new ol.style.Style({
          fill: new ol.style.Fill({
            color: 'rgba(0,0,255,0.5)'
          }),
          stroke: new ol.style.Stroke({
            color: '#00f',
            width: 1
          })
        });
        break;
      }
    }
  }
};