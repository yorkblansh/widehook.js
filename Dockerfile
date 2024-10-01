FROM node:20

RUN apt-get update && apt-get install fish mc vim curl sudo tmux iputils-ping -y && \
    echo "fish" >>~/.bashrc

RUN echo 'root:123' | chpasswd
RUN echo 'node:123' | chpasswd

RUN npm i -g npm npm-check-updates bun

RUN sudo usermod -a -G sudo node

USER node

# customize tmux
RUN cd && \
    git clone https://github.com/gpakosz/.tmux.git && \
    ln -s -f .tmux/.tmux.conf && \
    cp .tmux/.tmux.conf.local .

RUN echo "fish" >>~/.bashrc
RUN mkdir -p ~/.config/fish
RUN echo "alias tmux='tmux -2'" >>~/.config/fish/config.fish
# RUN echo "set -g default-terminal 'xterm-256color' \n set-option -ga terminal-overrides ',xterm-256color:Tc'" >>~/.tmux.conf
RUN echo "set -U fish_prompt_pwd_dir_length 0" >>~/.config/fish/config.fish
# RUN echo "set -g @plugin 'tmux-plugins/tmux-resurrect'" >>~/.tmux.conf
# RUN echo "set -g @plugin 'tmux-plugins/tpm'" >>~/.tmux.conf
# RUN echo "set -g @plugin 'tmux-plugins/tmux-sensible'" >>~/.tmux.conf

# install lazygit
RUN wget https://github.com/jesseduffield/lazygit/releases/download/v$(curl -s "https://api.github.com/repos/jesseduffield/lazygit/releases/latest" | grep -Po '"tag_name": "v\K[^"]*')/lazygit_$(curl -s "https://api.github.com/repos/jesseduffield/lazygit/releases/latest" | grep -Po '"tag_name": "v\K[^"]*')_Linux_32-bit.tar.gz -P ~/.lazygit/
RUN tar -xf ~/.lazygit/lazygit_$(curl -s "https://api.github.com/repos/jesseduffield/lazygit/releases/latest" | grep -Po '"tag_name": "v\K[^"]*')_Linux_32-bit.tar.gz -C ~/.lazygit/
RUN echo "alias lazygit='~/.lazygit/lazygit'" >>~/.config/fish/config.fish
RUN echo "alias lz='~/.lazygit/lazygit'" >>~/.config/fish/config.fish
RUN git config --global core.autocrlf true
RUN git config --global --add safe.directory '*'

WORKDIR /app

ENV PORT=5055

EXPOSE 5055

