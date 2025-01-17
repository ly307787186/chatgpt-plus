package oss

import (
	"chatplus/core/types"
	"chatplus/utils"
	"fmt"
	"github.com/gin-gonic/gin"
	"os"
	"path/filepath"
	"strings"
)

type LocalStorageService struct {
	config   *types.LocalStorageConfig
	proxyURL string
}

func NewLocalStorageService(config *types.AppConfig) LocalStorageService {
	return LocalStorageService{
		config:   &config.OSS.Local,
		proxyURL: config.ProxyURL,
	}
}

func (s LocalStorageService) PutFile(ctx *gin.Context, name string) (string, error) {
	file, err := ctx.FormFile(name)
	if err != nil {
		return "", fmt.Errorf("error with get form: %v", err)
	}

	filePath, err := utils.GenUploadPath(s.config.BasePath, file.Filename)
	if err != nil {
		return "", fmt.Errorf("error with generate filename: %s", err.Error())
	}
	// 将文件保存到指定路径
	err = ctx.SaveUploadedFile(file, filePath)
	if err != nil {
		return "", fmt.Errorf("error with save upload file: %s", err.Error())
	}

	return utils.GenUploadUrl(s.config.BasePath, s.config.BaseURL, filePath), nil
}

func (s LocalStorageService) PutImg(imageURL string) (string, error) {
	filename := filepath.Base(imageURL)
	filePath, err := utils.GenUploadPath(s.config.BasePath, filename)
	if err != nil {
		return "", fmt.Errorf("error with generate image dir: %v", err)
	}

	err = utils.DownloadFile(imageURL, filePath, s.proxyURL)
	if err != nil {
		return "", fmt.Errorf("error with download image: %v", err)
	}

	return utils.GenUploadUrl(s.config.BasePath, s.config.BaseURL, filePath), nil
}

func (s LocalStorageService) Delete(fileURL string) error {
	filePath := strings.Replace(fileURL, s.config.BaseURL, s.config.BasePath, 1)
	return os.Remove(filePath)
}

var _ Uploader = LocalStorageService{}
