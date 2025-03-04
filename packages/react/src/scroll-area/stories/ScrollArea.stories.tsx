import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// Components
import { Theme, Text, ScrollArea } from "../../index";

type Story = StoryObj<typeof ScrollArea>;

const meta: Meta<typeof ScrollArea> = {
  title: "Components/Scroll Area",
  component: ScrollArea,
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    )
  ]
};

export default meta;

export const Base: Story = {
  argTypes: {
    children: {
      control: false
    }
  },
  args: {
    style: { maxHeight: 400 },
    children: (
      <>
        <Text space={{ y: "md" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In suscipit placerat leo, vel
          ornare odio. Maecenas auctor pellentesque tempor. Phasellus vitae nulla felis. Integer
          bibendum enim risus, non vestibulum ante tempus sed. Praesent enim turpis, lobortis eget
          eros eget, imperdiet consectetur dui. Interdum et malesuada fames ac ante ipsum primis in
          faucibus. Vestibulum eu elit lobortis, tempus neque vel, fermentum justo. Integer accumsan
          interdum justo sit amet laoreet. Sed ornare libero id mauris mollis venenatis. Nulla
          facilisi. Cras ullamcorper est ac risus bibendum rutrum. Phasellus dignissim sapien metus,
          in vulputate ex commodo rutrum. Maecenas imperdiet maximus quam, in gravida sapien. Nulla
          sit amet semper magna, vel faucibus arcu.
        </Text>

        <Text space={{ y: "md" }}>
          Fusce ut felis augue. Nunc ut orci vel lorem molestie aliquet eu eu ipsum. Nunc auctor
          aliquam nulla, lobortis commodo diam scelerisque vel. Nullam at ipsum odio. Aliquam ac
          augue justo. Etiam id facilisis augue, at cursus elit. Morbi finibus sit amet magna id
          bibendum. Sed ut semper mi. Fusce fermentum mauris vel lorem tempor, ac faucibus erat
          fermentum. Mauris tincidunt sapien eget erat pretium egestas. Aenean ultricies risus quis
          tellus sagittis faucibus. Nulla feugiat orci id cursus tempor. Quisque molestie, enim
          vitae commodo fringilla, ipsum turpis venenatis magna, rutrum lobortis urna dui eget
          nulla. Maecenas consequat nunc ac sem vehicula, id vehicula sem consectetur.
        </Text>

        <Text space={{ y: "md" }}>
          Aenean ac semper quam. Duis id sem viverra, pretium mi nec, semper ligula. Mauris blandit
          tincidunt porttitor. Nunc convallis lacus ac leo vehicula, nec efficitur nibh consectetur.
          Aliquam ut fermentum urna. Mauris hendrerit ante ac massa ornare auctor. Lorem ipsum dolor
          sit amet, consectetur adipiscing elit. Nulla facilisi. Integer sollicitudin leo et augue
          mollis condimentum. Aenean leo orci, malesuada vitae sapien nec, maximus scelerisque enim.
          In hac habitasse platea dictumst. Maecenas eu tortor non urna porta commodo sed eu purus.
          Aliquam rhoncus porttitor tincidunt.
        </Text>

        <Text space={{ y: "md" }}>
          In ornare, tortor eget porttitor pulvinar, dui metus cursus metus, quis aliquet augue nibh
          ac sapien. Aliquam accumsan eget ligula egestas dictum. Duis ullamcorper nisi molestie
          tellus fringilla imperdiet. Morbi consectetur libero non eros efficitur viverra. Cras
          consequat tincidunt tellus ut facilisis. Proin tempor magna a nisi posuere pulvinar.
          Praesent convallis a augue posuere volutpat. Morbi nec felis quis turpis varius pharetra.
          Maecenas ac orci vel velit convallis tempus eget ut velit.
        </Text>

        <Text space={{ y: "md" }}>
          Nullam vel tortor et ipsum venenatis fermentum at ut mi. Sed orci ex, sagittis et pretium
          eget, accumsan ac ligula. Duis sodales quis massa tristique convallis. Donec placerat
          fermentum ex, eu mollis nisi ullamcorper quis. Donec consequat ultricies nunc, bibendum
          mattis mauris luctus eleifend. Nulla porta, dui a tempus dapibus, neque purus ultricies
          est, ac tempor lacus urna quis ex. Proin dignissim neque velit, vel ullamcorper metus
          euismod et. Praesent sem lorem, egestas vitae fringilla ac, viverra ac sapien. Praesent ut
          leo non velit sagittis tempor eu a orci. Quisque eu ultricies enim. Morbi eleifend
          consectetur mi vitae molestie. Proin facilisis vitae ex non feugiat. Pellentesque cursus
          urna eget arcu iaculis porttitor.
        </Text>
      </>
    )
  }
};
