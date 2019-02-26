import React, { Component } from 'react'
import Card from "components/Card/Card.jsx";
import { FilePond, registerPlugin, File } from "react-filepond";
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
import {serviceConstants} from "../../constants";

registerPlugin(FilePondPluginImageExifOrientation,
               FilePondPluginImagePreview,
               FilePondPluginImageCrop,
               FilePondPluginImageResize,
               FilePondPluginImageTransform)


export default class ImageUpload extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div>
        <Card>
            <FilePond
                  allowMultiple={false}
                  allowImageCrop={this.props.allowImageCrop}
                  imageCropAspectRatio={this.props.imageCropAspectRatio}
                  allowImageResize={this.props.allowImageResize}
                  imageResizeTargetWidth={this.props.imageResizeTargetWidth}
                  imageResizeTargetHeight={this.props.imageResizeTargetHeight}
                  allowImageTransform={this.props.allowImageTransform}
                  stylePanelLayout={'integrated'}
                  stylePanelAspectRatio={"1:1"}
                  styleLoadIndicatorPosition={'center bottom'}
                  styleButtonRemoveItemPosition={'center bottom'}
                  acceptedFileTypes={['image/jpeg','image/png']}
                  labelIdle='<span class="filepond--label-action">Browse</span>'
              >
              </FilePond>
        </Card>
      </div>
    )
  }
}
