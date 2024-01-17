wget https://github.com/jesseduffield/lazygit/releases/download/v$(curl -s "https://api.github.com/repos/jesseduffield/lazygit/releases/latest" | grep -Po '"tag_name": "v\K[^"]*')/lazygit_$(curl -s "https://api.github.com/repos/jesseduffield/lazygit/releases/latest" | grep -Po '"tag_name": "v\K[^"]*')_Linux_32-bit.tar.gz -P ~/.lazygit/
tar -xf ~/.lazygit/lazygit_$(curl -s "https://api.github.com/repos/jesseduffield/lazygit/releases/latest" | grep -Po '"tag_name": "v\K[^"]*')_Linux_32-bit.tar.gz -C ~/.lazygit/
echo "alias lazygit='~/.lazygit/lazygit'" >> ~/.config/fish/config.fish
echo "alias lz='~/.lazygit/lazygit'" >> ~/.config/fish/config.fish
source ~/.config/fish/config.fish